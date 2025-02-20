import { FaTrash } from "react-icons/fa";

export default function CartProductDetails({
  p,
  handleRemoveProductFromCart,
  handleUpdateProductQuantity,
}) {
  return (
    <>
      <tr className="border-b-gray-200 border-b-2 grid grid-cols-10 items-center">
        <td className="p-4 col-span-12 md:col-span-2">
          <img src={p.product?.imageCover} className="w-full md:w-32" alt="" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 col-span-12 md:col-span-6">
          <p className="mb-2">{p.product?.title}</p>
          <p className="mt-2">{p.product?.price} EGP</p>
          <button
            onClick={() => handleRemoveProductFromCart(p.product.id)}
            className="font-medium text-red-600 mt-2"
          >
            <FaTrash className=" inline-block me-1 text-red-600" />
            Remove
          </button>
        </td>
        <td className="py-4 m-auto col-span-12 md:col-span-2 md:ml-auto md:mr-4">
          <div className="flex items-center">
            <button
              onClick={() =>
                handleUpdateProductQuantity(p.product.id, p.count - 1)
              }
              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-8 w-8 text-gray-500 ring-2 ring-green-500 rounded-full hover:bg-green-500 transition-all  hover:text-white"
              type="button"
            >
              <span className="sr-only">Quantity button</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h16"
                />
              </svg>
            </button>
            <div>
              <span>{p.count}</span>
            </div>
            <button
              onClick={() =>
                handleUpdateProductQuantity(p.product.id, p.count + 1)
              }
              className="inline-flex items-center justify-center p-1 ms-3 text-sm font-medium h-8 w-8 text-gray-500 ring-2 ring-green-500 rounded-full hover:bg-green-500 transition-all hover:text-white"
              type="button"
            >
              <span className="sr-only">Quantity button</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
