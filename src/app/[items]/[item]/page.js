import Link from "next/link"
export default async function Home({ searchParams }) {
  const currentPage = Number(searchParams.page) || 0

  const data = await fetch(
    `https://dummyjson.com/products?limit=50&skip=${
      searchParams.page * 50 || 0
    }&select=title,price`,
    { cache: "no-store" }
  ).then((res) => res.json())

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `/items/products?${params.toString()}`
  }

  return (
    <div className="h-96">
      <ul>
        {data.products.map((product, index) => (
          <li key={index}>
            <div className="flex flex-row justify-between">
              <div>{product.id}</div>
              <div>{product.title}</div>
              <div>{product.price}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-row justify-between">
        <Link
          href={`${createPageURL(currentPage - 1 > 0 ? currentPage - 1 : 0)}`}
          // prefetch={false}
          enabled="true"
          className="rounded-lg border m-2 px-5 py-1 hover:border-gray-300"
        >
          back
        </Link>
        <Link
          href={`${createPageURL(
            currentPage * 50 + 50 <= data.total ? currentPage + 1 : currentPage
          )}`}
          prefetch={false}
          className="rounded-lg border m-2 px-5 py-1 hover:border-gray-300"
        >
          Next
        </Link>
      </div>
    </div>
  )
}
