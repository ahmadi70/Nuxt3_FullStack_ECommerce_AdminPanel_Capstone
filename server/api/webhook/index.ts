import Stripe from "stripe"
import db from "~/utils/db"


export default defineEventHandler(async (event) => {
  const signature = getHeader(event, 'Stripe-Signature') as string
  const body = await readRawBody(event)

  let stripeEvent: Stripe.Event

  try {
    // @ts-ignore
    stripeEvent = stripe.webhooks.constructEvent(body, signature, useRuntimeConfig().stripeWebhookSecret)
  } catch (error) {
    console.log(error)
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Signature'
    })
  }

  const session = stripeEvent.data.object as Stripe.Checkout.Session

  console.log(session)

  const address = session.customer_details?.address

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ]

  const addressString = addressComponents.filter(c => c !== null).join(', ')

  if (stripeEvent.type === 'checkout.session.completed') {
    const order = await db.order.update({
      where: {
        id: session?.metadata?.orderId
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || ''
      },
      include: {
        orderItems: true
      }
    })

    const productTds = order.orderItems.map(orderItem => orderItem.productId)

    await db.product.updateMany({
      where: {
        id: {
          in: [...productTds]
        }
      },
      data: {
        isArchived: true
      }
    })
  }

  return 200
})