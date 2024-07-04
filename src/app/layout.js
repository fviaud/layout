import { Inter } from "next/font/google"
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body class="flex flex-col min-h-screen">
        <header class="bg-blue-500 text-white p-4">
          <h1 class="text-center text-xl">Header</h1>
        </header>

        {children}
        <footer class="bg-blue-500 text-white p-4 mt-auto">
          <h1 class="text-center text-xl">Footer</h1>
        </footer>
      </body>
    </html>
  )
}
