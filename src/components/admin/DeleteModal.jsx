import React from "react";
import { IoMdClose } from "react-icons/io";

export default function DeleteModal({ title, onCancel, onDelete }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-80 z-50"
        onClick={() => onCancel()}
      />
      <div className="bg-white fixed z-60 w-108 p-6 top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bottom-auto rounded-3xl">
        <div className="flex justify-between pb-4 mb-4">
          <p className="text-sm text-black mb-8">{title}</p>
          <div className="text-black cursor-pointer">
            <IoMdClose onClick={() => onCancel()} />
          </div>
        </div>
        <div className="flex items-center gap-4 justify-center flex-wrap">
          <button
            onClick={() => onDelete()}
            className=" bg-red-600 text-white py-3 px-10 rounded-lg cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={() => onCancel()}
            className="py-3 px-10 bg-gray-primary rounded-lg cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
