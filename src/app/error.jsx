"use client";
import React from "react";

export default function error({ error }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-red-600 text-3xl">{error.message}</h1>
    </div>
  );
}
