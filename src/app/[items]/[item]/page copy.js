"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

export default async function Home({ searchParams }) {
  const [loading, setLoading] = useState("initialState")
  const currentPage = Number(searchParams.page) || 0
  const limit = 10

  const data = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${
      searchParams.page * limit || 0
    }&select=title,price&delay=2000`,
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
          prefetch={false}
          className="rounded-lg border m-2 px-5 py-1 hover:border-gray-300"
        >
          back
        </Link>
        <Link
          href={`${createPageURL(
            currentPage * limit + limit <= data.total ? currentPage + 1 : currentPage
          )}`}
          prefetch={false}
          className="rounded-lg border m-2 px-5 py-1 hover:border-gray-300"
        >
          Next
        </Link>
        <button>test</button>
      </div>
    </div>
  )
}
