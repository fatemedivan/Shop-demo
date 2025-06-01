import Link from "next/link";
import React from "react";
import ProductCard from "@/components/common/ProductCard";
import Pagination from "@/components/common/Pagination";

export default async function ProductsList({ searchParams }) {
  const params = await searchParams;
  let products = [];
  let err = null;
  try {
    const response = await fetch("http://localhost:8000/products");
    products = await response.json();
  } catch (error) {
    err = error.message;
  }
  const currentPage = parseInt(params?.page || "1");
  const startIndex = (currentPage - 1) * 4;
  const currentProducts = products.slice(startIndex, startIndex + 4);

  if (err)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-red-600 text-3xl">{err}</h1>
      </div>
    );
  return (
    <div className="container mx-auto">
      <div className="p-10 flex items-center gap-30 flex-wrap">
        {currentProducts &&
          currentProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <ProductCard {...product} />
            </Link>
          ))}
      </div>
      <Pagination products={products} currentPage={currentPage} />
    </div>
  );
}
