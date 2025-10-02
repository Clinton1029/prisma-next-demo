import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const posts = await prisma.post.findMany({
    include: { author: true }
  })
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  const body = await req.json()
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: body.authorId
    }
  })
  return NextResponse.json(post)
}
