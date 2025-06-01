"use client";
import Link from "next/link";
import React, { useState } from "react";

import { MdProductionQuantityLimits } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div>
      <div className="md:hidden">
        <nav className="bg-gray-primary text-white">
          <ul className="flex items-center gap-4 p-5">
            <Link href={"/admin"}>
              <li className={`${pathname === "/admin" && "text-blue-600"}`}>
                products
              </li>
            </Link>
            <Link href={'/admin/add-product'}>
              <li
                className={`${
                  pathname.includes("add-product") && "text-blue-600"
                }`}
              >
                add products
              </li>
            </Link>
          </ul>
        </nav>
      </div>

      <div className="hidden md:block">
        <div
          className={`h-full left-0 top-0 fixed bg-gray-primary text-white w-45 translate-x-0`}
        >
          <div className="flex items-center justify-between p-2 border-b-1 border-white">
            <h1>welcome to dashboard</h1>
          </div>
          <ul className="pt-6">
            <Link href={"/admin"}>
              <li
                className={`flex gap-2 items-center text-xl p-3 w-full ${
                  pathname === "/admin" ? "bg-[#222]" : ""
                }`}
              >
                <MdProductionQuantityLimits />
                Products
              </li>
            </Link>
            <Link href={"/admin/add-product"}>
              <li
                className={`flex gap-2 items-center text-xl p-3 w-full ${
                  pathname.includes("add-product") ? "bg-[#222]" : ""
                }`}
              >
                <IoIosAddCircleOutline />
                add Product
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
