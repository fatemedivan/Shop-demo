"use client";
import { useCartContext } from "@/context/CartContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { HiOutlineStar } from "react-icons/hi2";

export default function Page() {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:8000/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        setErr(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [id]);
  const { handleIncreaseqty, handleDecreaseqty, getProductQty } =
    useCartContext();
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
      {product && (
        <div className="flex flex-row-reverse justify-between gap-5">
          <div className="relative overflow-hidden">
            <img src={product.image} alt="" />
            {!product.inStock && (
              <div className="absolute top-5 -left-8 bg-red-500 text-white px-10 py-1 -rotate-45">
                sold out
              </div>
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold lg:text-5xl">{product.name}</h1>
            <p className="text-lg lg:text-2xl mt-3">Price:{product.price}$</p>
            <div className="mt-3 flex gap-1 text-yellow-400">
              {Array.from({ length: product.rating }, (_, i) => (
                <FaStar key={i} />
              ))}
              {Array.from({ length: 5 - product.rating }, (_, i) => (
                <HiOutlineStar key={i} />
              ))}
            </div>
            {product.inStock && (
              <div className="mt-5">
                <button
                  className="bg-red-500 text-white cursor-pointer py-1 px-3 rounded-lg"
                  onClick={() => handleIncreaseqty(id)}
                >
                  {getProductQty(id) === 0 ? "add to cart" : "+"}
                </button>
                {getProductQty(id) !== 0 && (
                  <>
                    <span className="mx-3">{getProductQty(id)}</span>
                    <button
                      className="bg-red-500 text-white cursor-pointer py-1 px-3 rounded-lg"
                      onClick={() => handleDecreaseqty(id)}
                    >
                      -
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
