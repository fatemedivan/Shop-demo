import ProductsList from "@/components/common/ProductsList";
import React from "react";

export default function Page({searchParams}) {
  return (
    <div>
      <ProductsList searchParams={searchParams}/>
    </div>
  );
}
