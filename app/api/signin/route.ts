import { db } from '@/lib/db'
import { comparePasswords, createJWT } from '@/lib/auth'
import { serialize } from 'cookie'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const user = await db.user.findUnique({
    where: {
      email: body.email,
    },
  })

  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid login' }), {
      status: 401,
    })
  }

  const isUser = await comparePasswords(body.password, user.password)

  if (isUser) {
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
  } else {
    return NextResponse.json(
      { error: 'Invalid login' },
      {
        status: 401,
      },
    )
  }
}
