"use client";
import ProductCard from "@/components/common/ProductCard";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("name_like") || "";

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchSearchedProducts = async () => {
      if (!query) return;
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://localhost:8000/products?name_like=${query}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        setErr(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchedProducts();
  }, [query]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  if (err)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-red-600 text-3xl">{err}</h1>
      </div>
    );
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl mb-5">Results for : "{query}"</h1>

      {isLoading && <p>searching...</p>}

      {!isLoading && products.length === 0 && <p>Product Not Found</p>}
      <div className=" flex items-center gap-30 flex-wrap">
        {products &&
          products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <ProductCard {...product} />
            </Link>
          ))}
      </div>
    </div>
  );
}
