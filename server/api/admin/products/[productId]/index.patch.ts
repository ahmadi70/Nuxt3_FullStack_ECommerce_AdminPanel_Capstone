import db from "~/utils/db"
import { productSchema } from "~/utils/validations"

export default defineEventHandler(async (event) => {
  
  await requireUserSession(event)

  const session = await getUserSession(event)

  if (session.user && session.user.role === 'ADMIN') {

    const { name, price, categoryId, sizeId, colorId, images, isArchived, isFeatured } = await readValidatedBody(event, (body) => productSchema.parse(body))

    await db.product.update({
      where: {
        id: event.context.params?.productId
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {}
        },
        isFeatured,
        isArchived,
        userId: session.user.id
      }
    })

    const updatedProduct = await db.product.update({
      where: {
        id: event.context.params?.productId
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          createMany: {
            data: [
              ...images.map(img => img)
            ]
          }
        },
        isFeatured,
        isArchived,
        userId: session.user.id
      }
    })

    return updatedProduct
    
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized. You don't have admin access"    
    })
  }
})