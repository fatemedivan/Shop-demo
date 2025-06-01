"use client";
import React, { useEffect, useState } from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import ProductCard from "../common/ProductCard";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function ProductsTable() {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [mainProductInfo, setMainProductInfo] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isShowEditModal && mainProductInfo) {
      reset({
        name: mainProductInfo.name,
        price: mainProductInfo.price,
        image: mainProductInfo.image,
        stock: mainProductInfo.inStock ? "true" : "false",
        rating: mainProductInfo.rating,
      });
    }
  }, [isShowEditModal, mainProductInfo]);

  const editModalSubmit = async (data) => {
    const newProductInfos = {
      name: data.name,
      price: data.price,
      inStock: data.stock === "true",
      image: data.image,
      rating: data.rating,
    };
    try {
      const res = await fetch(`http://localhost:8000/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProductInfos),
      });
      if (res.ok) {
        getAllproducts();
        toast.success("edited successfully");
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.log(error);
      toast.error("error");
    } finally {
      setIsShowEditModal(false);
    }
  };

  const deleteModalSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:8000/products/${productId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        getAllproducts();
        toast.success("deleted successfully");
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.log(error);
      toast.error("error");
    } finally {
      setIsShowDeleteModal(false);
    }
  };

  useEffect(() => {
    getAllproducts();
  }, []);

  const getAllproducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:8000/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>loading...</p>
      </div>
    );
  return (
    <div className="container px-4 mx-auto my-10">
      <h1 className="text-3xl ml-5 md:ml-60 mb-3 mt-10">Products List:</h1>
      {products.length !== 0 && (
        <div className="flex flex-wrap gap-5 justify-center items-center md:ml-50 lg:hidden">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-primary rounded-lg">
              <ProductCard {...product} />
              <div className="my-3 flex justify-center items-center gap-3">
                <button
                  onClick={() => {
                    setProductId(product.id);
                    setMainProductInfo(product);
                    setIsShowDeleteModal(true);
                  }}
                  className="bg-blue-600 rounded-xl p-3 text-white mx-3 cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setMainProductInfo(product);
                    setProductId(product.id);
                    setIsShowEditModal(true);
                  }}
                  className="bg-blue-600 rounded-xl p-3 text-white mx-3 cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* desktop design */}
      <div className="hidden lg:block">
        <div className="lg:flex lg:justify-center lg:items-center">
          {products.length !== 0 && (
            <div className="ml-30 rounded-lg p-5 mt-3 bg-gray-primary">
              <table className="bg-transparent">
                <thead>
                  <tr>
                    <th className="pb-3 text-sm lg:text-lg lg:px-5">img</th>
                    <th className="pb-3 text-sm lg:text-lg lg:px-5">name</th>
                    <th className="pb-3 text-sm lg:text-lg lg:px-5">price</th>
                    <th className="pb-3 text-sm lg:text-lg lg:px-5">
                      in stock
                    </th>
                    <th className="pb-3 text-sm lg:text-lg lg:px-5">rating</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="pb-3 text-sm lg:text-lg lg:px-5">
                        <img
                          className="w-20 h-20 rounded-lg"
                          src={product.image}
                        />
                      </td>
                      <td className="pb-3 text-sm lg:text-lg lg:px-5">
                        {product.name}
                      </td>
                      <td className="pb-3 text-sm lg:text-lg lg:px-5">
                        {product.price}$
                      </td>
                      <td className="pb-3 text-sm lg:text-lg lg:px-5">
                        {product.inStock ? "yes" : "no"}
                      </td>
                      <td className="pb-3 text-sm lg:text-lg lg:px-5">
                        {product.rating}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setIsShowDeleteModal(true);
                            setProductId(product.id);
                            setMainProductInfo(product);
                          }}
                          className="bg-blue-600 rounded-xl p-3 text-white mx-3 cursor-pointer"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setMainProductInfo(product);
                            setProductId(product.id);
                            setIsShowEditModal(true);
                          }}
                          className="bg-blue-600 rounded-xl p-3 text-white mx-3 cursor-pointer"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {isShowDeleteModal && (
        <DeleteModal
          title={`Are you sure for Delete ${mainProductInfo.name} ?`}
          onDelete={deleteModalSubmit}
          onCancel={() => setIsShowDeleteModal(false)}
        />
      )}
      {isShowEditModal && (
        <EditModal
          onSubmit={handleSubmit(editModalSubmit)}
          onCancel={() => setIsShowEditModal(false)}
        >
          <div>
            <label className="text-gray-primary block pb-1">name:</label>
            <div className="border border-gray-primary text-gray-primary p-3 rounded-xl mb-3 placeholder:text-gray-primary">
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Enter at least 2 characters",
                  },
                })}
                className="outline-none"
                type="text"
                placeholder="Enter new name"
              />
            </div>
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
            <label className="text-gray-primary block pb-1">price:</label>
            <div className="border border-gray-primary text-gray-primary  p-3 rounded-xl mb-3 placeholder:text-gray-primary">
              <input
                {...register("price", {
                  required: "Price is required",
                  min: {
                    value: 10,
                    message: "Price must be a positive number",
                  },
                  valueAsNumber: true,
                })}
                className="outline-none"
                type="number"
                placeholder="Enter new price"
              />
            </div>
            {errors.price && (
              <p className="text-red-600 text-sm">{errors.price.message}</p>
            )}
            <label className="text-gray-primary block pb-1">image:</label>
            <div className="border border-gray-primary text-gray-primary  p-3 rounded-xl mb-3 placeholder:text-gray-primary">
              <input
                {...register("image", {
                  required: "Image is required",
                })}
                className="outline-none"
                type="text"
                placeholder="Enter new img"
              />
            </div>
            {errors.image && (
              <p className="text-red-600 text-sm">{errors.image.message}</p>
            )}
            <label className="text-gray-primary block pb-1">stock:</label>
            <div className="border border-gray-primary text-gray-primary  p-3 rounded-xl mb-3 placeholder:text-gray-primary">
              <select
                {...register("stock", {
                  required: "Stock is required",
                  validate: (value) =>
                    value === "true" ||
                    value === "false" ||
                    "Only true or false is allowed",
                })}
                className="outline-none w-full bg-transparent"
              >

                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            {errors.stock && (
              <p className="text-red-600 text-sm">{errors.stock.message}</p>
            )}
            <label className="text-gray-primary block pb-1">rating:</label>
            <div className="border border-gray-primary text-gray-primary p-3 rounded-xl mb-3 placeholder:text-gray-primary">
              <input
                {...register("rating", {
                  required: "Rating is required",
                  min: { value: 1, message: "Rating must be at least 1" },
                  max: { value: 5, message: "Rating must be at most 5" },
                  valueAsNumber: true,
                })}
                className="outline-none"
                type="text"
                placeholder="Enter new rating"
              />
            </div>
            {errors.rating && (
              <p className="text-red-600 text-sm">{errors.rating.message}</p>
            )}
          </div>
        </EditModal>
      )}
    </div>
  );
}
