import React from "react";

export default function EditModal({onCancel ,onSubmit, children }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-[#1E1E1E] opacity-80 z-50"
        onClick={() => onCancel()}
      />
      <div className="bg-white fixed  z-60 w-108 p-4 top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bottom-auto rounded-3xl">
        <div className="flex flex-col justify-between items-center mb-2">
          <h1 className="text-xl text-center mb-5 text-gray-primary">
            Enter the new details
          </h1>
          {children}

          <button
            onClick={() => onSubmit()}
            className="bg-blue-600 rounded-xl px-6 py-3 text-white mx-3 mt-3 cursor-pointer"
          >
            submit
          </button>
        </div>
      </div>
    </>
  );
}
