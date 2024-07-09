import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <header className="p-4">
          <h1 className="text-center text-xl">Header</h1>
        </header>

        {children}
        <footer className="bg-blue-500 text-white p-4 mt-auto">
          <h1 className="text-center text-xl">Footer</h1>
        </footer>
      </body>
    </html>
  )
}
