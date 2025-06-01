"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createNewProduct = async (data) => {
    const newProductInfos = {
      name: data.name,
      price: data.price,
      image: data.image,
      rating: data.rating,
      inStock: true,
    };

    try {
      const res = await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProductInfos),
      });

      if (res.ok) {
        toast.success("Product created successfully");
        reset();
        setTimeout(() => {
          router.push("/admin");
        }, 2000);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="mt-10 ml-4 md:ml-50 mr-5">
      <h1 className="text-3xl mb-3">Add new product</h1>
      <form
        onSubmit={handleSubmit(createNewProduct)}
        className="bg-gray-primary rounded-lg p-5 flex flex-col"
      >
        <div className="w-full grid grid-cols-1 justify-center items-center md:grid-cols-2 gap-3 text-black">
          <div className="w-full bg-white p-3 rounded-xl">
            <input
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Enter at least 2 characters" },
              })}
              className="outline-none w-full"
              type="text"
              placeholder="Enter new name"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="w-full bg-white p-3 rounded-xl">
            <input
              {...register("price", {
                required: "Price is required",
                min: { value: 10, message: "Price must be a positive number" },
                valueAsNumber: true,
              })}
              className="outline-none w-full"
              type="number"
              placeholder="Enter new price"
            />
            {errors.price && (
              <p className="text-red-600 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="w-full bg-white p-3 rounded-xl">
            <input
              {...register("image", { required: "Image URL is required" })}
              className="outline-none w-full"
              type="text"
              placeholder="Enter new image URL"
            />
            {errors.image && (
              <p className="text-red-600 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <div className="w-full bg-white p-3 rounded-xl">
            <input
              {...register("rating", {
                required: "Rating is required",
                min: { value: 1, message: "Rating must be at least 1" },
                max: { value: 5, message: "Rating must be at most 5" },
                valueAsNumber: true,
              })}
              className="outline-none w-full"
              type="text"
              placeholder="Enter new rating"
            />
            {errors.rating && (
              <p className="text-red-600 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end items-center">
          <button
            type="submit"
            className="bg-blue-600 rounded-xl p-3 text-white mt-3 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
