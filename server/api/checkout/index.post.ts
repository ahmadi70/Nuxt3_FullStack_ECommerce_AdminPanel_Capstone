import db from '~/utils/db'
import { stripe } from '~/server/utils/stripe'

export default defineEventHandler(async (event) => {
  const productTds = await readBody(event)

  if(!productTds || !productTds.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Product ids are required'
    })
  }

  const products = await db.product.findMany({
    where: {
      id: {
        in: productTds
      }
    }
  })

  const order = await db.order.create({
    data: {
      isPaid: false,
      orderItems: {
        create: productTds.map((productTd: string) => ({
          product: {
            connect: {
              id: productTd
            }
          }
        }))
      }
    }
  })

  const session = await stripe.checkout.sessions.create({
    line_items: products.map(product => {
      return {
        quantity: 1,
        price_data: {
          currency: 'USD',
          product_data: {
            name: product.name
          },
          unit_amount: product.price * 100
        }
      }
    }),
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true
    },
    success_url: `${process.env.APP_URL}/cart?success=1`,
    cancel_url: `${process.env.APP_URL}/cart?cancel=1`,
    metadata: {
      orderId: order.id
    }
  })

  return session.url
})