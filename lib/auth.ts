import bcrypt from 'bcrypt'
import { SignJWT, jwtVerify } from 'jose'
import { db } from './db'
import { User } from '@prisma/client'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

type JWTPayload = {
  id: string
  email: string
}

export const hashPassword = (password: string) => bcrypt.hash(password, 10)

export const comparePasswords = (plainTextPassword: string, hashedPassword: string) =>
  bcrypt.compare(plainTextPassword, hashedPassword)

export const createJWT = (user: User) => {
  // return jwt.sign({ id: user.id }, 'cookies')
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 * 24 * 7

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET))

  return payload.payload as JWTPayload
}

export const getUserFromCookie = async (cookies: ReadonlyRequestCookies) => {
  const jwt = cookies.get(process.env.COOKIE_NAME ?? '')

  const { id } = await validateJWT(jwt?.value ?? '')

  const user = await db.user.findUniqueOrThrow({
    where: {
      id: id as string,
    },
  })

  return user
}
