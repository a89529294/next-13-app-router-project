import { db } from '@/lib/db'
import { createJWT, hashPassword } from '@/lib/auth'
import { serialize } from 'cookie'
import { type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const user = await db.user.create({
    data: {
      email: body.email,
      password: await hashPassword(body.password),
      firstName: body.firstName,
      lastName: body.lastName,
    },
  })

  const jwt = await createJWT(user)
  return new Response(null, {
    status: 201,
    headers: {
      'Set-Cookie': serialize(process.env.COOKIE_NAME ?? '', jwt, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      }),
    },
  })
}
