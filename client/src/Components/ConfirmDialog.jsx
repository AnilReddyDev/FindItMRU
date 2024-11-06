import React from "react";

export default function ConfirmDialog() {
  return (
    <div className=" w-80 p-2 relative  flex bg-slate-50 my-5 rounded-md flex-col ">
      <button className="absolute top-4 text-black right-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="w-full font-semibold  text-black h-auto flex justify-between px-5 py-5">
        <h1 className="text-xl">Delete Item</h1>
      </div>
      <p className="px-5 pb-4 text-black">
        Are you sure you want to delete this item?
      </p>
      <div className="flex justify-end px-5 py-5">
        <button className="text-white bg-gradient-to-r px-4 py-1.5  gap-1 rounded-full from-green-800 to-green-500 text-base  font-medium cursor-pointer flex items-center justify-end   ">
          Continue
        </button>
      </div>
    </div>
  );
}
