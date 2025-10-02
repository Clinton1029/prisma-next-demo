import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to DB (using Prisma / Mongo / etc.)
    // Example: await prisma.user.create({ data: { email, password: hashedPassword } });

    return NextResponse.json({ message: "User registered successfully!" });
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
