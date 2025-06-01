import React from "react";
import { FaStar } from "react-icons/fa";
import { HiOutlineStar } from "react-icons/hi";

export default function ProductCard({ image, name, price, rating, inStock, id }) {
  return (
    <div className="rounded-xl overflow-hidden relative">
      <img className="w-60 h-60" src={image} alt="" />
      <div className="p-3 bg-[#333]">
        <h1>name : {name}</h1>
        <p>price : {price}$</p>
        <div className="mt-3 flex gap-1 text-yellow-400">
          {Array.from({ length: rating }, (_, i) => (
            <FaStar key={i} />
          ))}
          {Array.from({ length: 5 - rating }, (_, i) => (
            <HiOutlineStar key={i} />
          ))}
        </div>
      </div>
      {!inStock && (
        <div className="absolute top-5 -left-8 bg-red-500 text-white px-10 py-1 -rotate-45">
          sold out
        </div>
      )}
    </div>
  );
}
