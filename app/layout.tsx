import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import "./globals.css"
// Added LanguageProvider import
import { LanguageProvider } from "@/lib/contexts/language-context"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "Market Insights Hub - Ethiopian Financial News",
  description:
    "Stay ahead with real-time insights on crypto and forex markets. Your trusted source for Ethiopian financial market analysis.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${workSans.variable} ${openSans.variable}`}>
      <body className="font-sans antialiased">
        {/* Wrapped children with LanguageProvider */}
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
