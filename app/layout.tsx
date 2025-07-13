import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Simple Code Generator",
  description: "Generate React apps with AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}