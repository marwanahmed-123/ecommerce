import { useState } from "react";
import { FaX } from "react-icons/fa6";
export default function BrandCard({ brand }) {
  const [showBrandDetails, setShowBrandDetails] = useState(false);
  return (
    <>
      <div onClick={() => setShowBrandDetails(true)} className="card px-2 py-3">
        <div className="border-2 p-4 border-gray-200 hover:border-[rgba(22,163,74,0.2)] text-center flex flex-col justify-center overflow-hidden group hover:shadow-[0px_4px_15px_rgba(22,163,74,0.5)] transition-all duration-500 rounded-lg">
          <img className="w-full object-cover mb-2" src={brand.image} alt="" />
          <h2>{brand.name}</h2>
        </div>
      </div>
      {showBrandDetails && (
        <>
          <div
            onClick={() => setShowBrandDetails(false)}
            className="fixed inset-0 bg-gray-500/50 flex justify-center items-center"
          ></div>
          <div className="left-1/2 top-24 fixed -translate-x-1/2 bg-white w-[300px] md:w-[500px] p-4">
            <FaX
              className="text-gray-500 hover:text-gray-600 cursor-pointer ml-auto text-xl"
              onClick={() => setShowBrandDetails(false)}
            />
            <div className=" my-6 flex flex-col items-center justify-center md:flex-row">
              <div className="w-full p-4">
                <h2 className="text-green-600 font-semibold text-3xl">
                  {brand.name}
                </h2>
                <p>{brand.slug}</p>
              </div>
              <img
                className="w-full object-cover m-0 border-2 border-gray-200"
                src={brand.image}
                alt=""
              />
            </div>
            <div className="ml-auto w-fit">
              <button
                className="bg-gray-500 text-white rounded-md px-4 py-2 transition-all hover:bg-gray-600"
                onClick={() => setShowBrandDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
