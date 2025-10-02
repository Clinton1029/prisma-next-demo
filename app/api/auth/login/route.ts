import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyPassword, generateToken } from "@/lib/auth"

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = body

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const valid = verifyPassword(password, user.password)
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const token = generateToken(user.id)

  return NextResponse.json({ token })
}
