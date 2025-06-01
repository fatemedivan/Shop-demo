"use client";
import { useCartContext } from "@/context/CartContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CiShoppingCart } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const router = useRouter();
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      router.push(`/search?name_like=${searchQuery}`);
    }
  };
  const { cartTotalQty } = useCartContext();
  if (pathname.startsWith("/admin")) {
    return null;
  }
  return (
    <div className="py-5 px-4 bg-gray-primary text-white">
      <div className="container mx-auto flex justify-between items-center flex-wrap gap-10">
        <div
          className="lg:hidden cursor-pointer"
          onClick={() => setIsOpenMenu(true)}
        >
          <GiHamburgerMenu />
        </div>
        {isOpenMenu && (
          <ul
            className={
              "absolute left-0 top-0 h-screen z-20 flex flex-col items-center p-8 text-white bg-gray-primary gap-4 lg:hidden"
            }
          >
            <div
              onClick={() => setIsOpenMenu(false)}
              className="text-white lg:hidden cursor-pointer"
            >
              {isOpenMenu && <IoMdClose />}
            </div>
            <Link href={"/"}>
              <li className={`${pathname === "/" && "text-red-600"}`}>Home</li>
            </Link>
            <Link href={"/contact"}>
              <li
                className={`${pathname.includes("contact") && "text-red-600"}`}
              >
                contact
              </li>
            </Link>

            <li className="relative">
              <CiShoppingCart className="w-7 h-7" />
              <span className="absolute -top-1 left-5 bg-red-500 text-white w-5 h-5 rounded-full flex justify-center items-center">
                {cartTotalQty}
              </span>
            </li>
          </ul>
        )}
        <ul
          className={
            "hidden lg:flex items-center text-white bg-gray-primary gap-4"
          }
        >
          <Link href={"/"}>
            <li className={`${pathname === "/" && "text-red-600"}`}>Home</li>
          </Link>
          <Link href={"/contact"}>
            <li className={`${pathname.includes("contact") && "text-red-600"}`}>
              contact
            </li>
          </Link>

          <li className="relative">
            <CiShoppingCart className="w-7 h-7" />
            <span className="absolute -top-1 left-5 bg-red-500 text-white w-5 h-5 rounded-full flex justify-center items-center">
              {cartTotalQty}
            </span>
          </li>
        </ul>
        <div className="bg-white rounded-lg flex justify-between items-center">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none placeholder:text-black pb-3 pt-2 pl-3 text-black"
            placeholder="search..."
            type="text"
            name="search"
            id="search"
          />
          <div
            onClick={() => handleSearch()}
            className="bg-gray-primary py-3.5 px-3 text-white border border-white rounded-tr-lg rounded-br-lg cursor-pointer"
          >
            <HiMagnifyingGlass />
          </div>
        </div>
      </div>
    </div>
  );
}
