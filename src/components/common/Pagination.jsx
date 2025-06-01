import Link from "next/link";
import React from "react";

export default function Pagination({products, currentPage }) {
  const totalPages = Math.ceil(products.length / 4);
  return (
    <div className="flex justify-center my-10 space-x-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link key={page} href={`?page=${page}`}>
          <button
            className={`px-4 py-2 rounded cursor-pointer ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}
          >
            {page}
          </button>
        </Link>
      ))}
    </div>
  );
}
