import { useState } from "react";
import { FaX } from "react-icons/fa6";
export default function CategoryCard({ category }) {
  return (
    <>
      <div className="card px-2 py-3 h-80">
        <div className="text-center flex flex-col justify-between pb-4 hover:shadow-[0px_4px_15px_rgba(22,163,74,0.5)] transition-all duration-500 rounded-lg h-full border-gray-200 border-2 hover:border-[rgba(22,163,74,0.2)]">
          <img
            className="w-full h-[80%] md:h-52 object-cover object-center mb-8 top-0 relative"
            src={category.image}
            alt=""
          />
          <h2 className="text-green-700 font-semibold text-2xl">
            {category.name}
          </h2>
        </div>
      </div>
    </>
  );
}
