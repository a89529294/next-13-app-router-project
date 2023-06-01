import { validateJWT } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const user = await validateJWT(req.cookies.get(process.env.COOKIE_NAME ?? '')?.value ?? '')

  await db.project.create({
    data: {
      name: body.name,
      ownerId: user.id,
    },
  })

  return NextResponse.json({ data: { message: 'ok' } })
}
