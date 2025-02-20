import { useContext, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "../Context/CartContext";
import Loading from "../loading/loading";
export default function ProductCard({ product }) {
  const { addProductToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  async function handleAddProductToCart(id) {
    setLoading(true);
    const res = await addProductToCart(id);
    toast.success(res.data.message);
    setLoading(false);
    console.log(res);
  }
  return (
    <div>
      {loading && <Loading />}
      <div className="card px-2 py-3">
        <div className="gap p-4 overflow-hidden group hover:shadow-[0px_4px_15px_rgba(22,163,74,0.5)] transition-all duration-500 rounded-lg">
          <Link
            to={`/e-commerce/ProductDetails/${product._id}/${product.category._id}`}
          >
            <img
              className="w-full md:h-52 object-cover object-center mb-8"
              src={product.imageCover}
              alt=""
            />
            <p className="text-green-500 mb-6">{product.category.name}</p>
            <h2 className="text-lg font-semibold mb-3">
              {product.title.split(" ", 2).join(" ")}
            </h2>
            <div className="flex justify-between mb-3">
              <span>{product.price}</span>
              <span>
                {product.ratingsAverage}
                <FaStar className="inline-block text-yellow-500" />
              </span>
            </div>
          </Link>
          <div className="flex justify-between">
            <button
              disabled={loading}
              onClick={() => handleAddProductToCart(product.id)}
              className="w-full mt-2 group-hover:translate-y-0 transition-all duration-500 text-white translate-y-28  bg-green-700 hover:bg-green-700 focus:ring-4 focus:ring-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none"
            >
              Add to cart
            </button>
            <button className="hover:text-red-500 mt-4 h-min">
              <FaHeart className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
