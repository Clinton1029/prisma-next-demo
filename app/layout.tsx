import type { Metadata } from "next"
import "./globals.css"

// If you’re using custom fonts, keep your imports here
// import { GeistSans } from "next/font/google"

export const metadata: Metadata = {
  title: "Prisma + Next.js Auth Demo",
  description: "Next.js app with Prisma, JWT authentication, and protected routes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning  // ✅ prevents Grammarly/extension mismatches
        className="antialiased"
      >
        {children}
      </body>
    </html>
  )
}
