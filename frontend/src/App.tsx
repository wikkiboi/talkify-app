function App() {
  return <div>Hi This is Talkigfy asdfkjhasdfjkasdh</div>;
}

export default App;

import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Discord-like Chat",
  description: "A Discord-like chat application using Next.js and AI SDK",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}