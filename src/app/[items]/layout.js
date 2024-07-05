import Link from "next/link"

export default function Layout({ children }) {
  return (
    <main className="flex flex-grow overflow-hidden">
      <div className="w-1/4 bg-gray-200 p-4 overflow-auto hidden md:block">
        <ul>
          <li>
            <Link href="/items/" prefetch={false}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/items/products" prefetch={false}>
              Products
            </Link>
          </li>
        </ul>
      </div>

      <div className="w-full md:w-3/4 bg-gray-100 p-4 overflow-auto">{children}</div>
    </main>
  )
}
