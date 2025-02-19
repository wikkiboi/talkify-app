// function App() {
//   return <div>Hi This is Talkigfy asdfkjhasdfjkasdh</div>;
// }

// export default App;

import "../style.css"
// import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Talkify App",
  description: "A Discord-like chat application with music implementations.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}