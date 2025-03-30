import db from "~/utils/db"
import { authSchema } from "~/utils/validations"


export default defineEventHandler( async (event) => {
  const { name, password, email } = await readValidatedBody(event, (body) => authSchema.parse(body))

  const existingUser = await db.user.findUnique({
    where: {
      email
    }
  })

  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User already exist'
    })
  }

  const hashedPassword = await hashPassword(password)

  const user = await db.user.create({
    data: {
      email,
      hashedPassword,
      name
    }
  })

  const transformedUser = sanitizeUser(user)

  if (transformedUser) {
    await setUserSession(event, {
      // @ts-ignore
      user: transformedUser
    })
  }

  return sendRedirect(event, '/')
})