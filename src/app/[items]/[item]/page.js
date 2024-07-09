// use client directive to indicate this is a client component
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

// Server-side function to fetch data
async function fetchData(page) {
  const limit = 10
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${page * limit || 0}&select=title,price`,
    { cache: "no-store" }
  )
  const data = await response.json()
  return data
}

export default function Home({ searchParams }) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [data, setData] = useState({ products: [], total: 0 })
  const currentPage = Number(searchParams.page) || 0

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const fetchedData = await fetchData(currentPage)
      setData(fetchedData)
      setLoading(false)
    }

    getData()
  }, [currentPage])

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `/items/products?${params.toString()}`
  }

  // if (loading) {
  //   return <div>Loading...</div>
  // }

  useEffect(() => {
    // Example: Simulate progress update
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 10 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const ProgressBar = ({ progress }) => {
    return (
      <div className="fixed top-0 left-0 w-full bg-gray-200 h-1">
        <div
          className="bg-blue-600 h-1 transition-width duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )
  }

  return (
    <div className="h-96">
      {loading && <ProgressBar progress={progress} />}
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
      {data.products.length > 0 && (
        <div className="flex flex-row justify-between">
          <Link
            href={`${createPageURL(currentPage - 1 > 0 ? currentPage - 1 : 0)}`}
            prefetch={false}
            className="rounded-lg border m-2 px-5 py-1 hover:border-gray-300"
          >
            Back
          </Link>
          <Link
            href={`${createPageURL(
              currentPage * 10 + 10 <= data.total ? currentPage + 1 : currentPage
            )}`}
            prefetch={false}
            className="rounded-lg border m-2 px-5 py-1 hover:border-gray-300"
          >
            Next
          </Link>
        </div>
      )}
    </div>
  )
}
