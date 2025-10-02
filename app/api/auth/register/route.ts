import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/auth"

export async function POST(req: Request) {
  const body = await req.json()
  const { email, name, password } = body

  // Check if user exists
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }

  // Hash password
  const hashed = hashPassword(password)

  const user = await prisma.user.create({
    data: { email, name, password: hashed },
  })

  return NextResponse.json({ id: user.id, email: user.email })
}
