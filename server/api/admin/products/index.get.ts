import db from "~/utils/db"

export default defineEventHandler(async (event) => {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      images: true,
      category: true,
      color: true,
      size: true
    }
  })

  const featuredProducts = await db.product.findMany({
    where: {
      isFeatured: true,
      isArchived: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: true,
      category: true,
      color: true,
      size: true,
    },
  })

  const archivedProducts = await db.product.findMany({
    where: {
      isArchived: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: true,
      category: true,
      color: true,
      size: true,
    },
  })

  return {
    products,
    featuredProducts,
    archivedProducts,
  }
})