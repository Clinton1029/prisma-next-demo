import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization")
  if (!authHeader) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 })
  }

  const token = authHeader.split(" ")[1]
  const payload = verifyToken(token)

  if (!payload) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 })
  }

  return NextResponse.json({ message: "You are authorized!", userId: payload.userId })
}
