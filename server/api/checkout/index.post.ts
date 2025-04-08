import db from '~/utils/db'

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

  return order
})