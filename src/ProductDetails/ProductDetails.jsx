import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../loading/loading";
import { FaHeart, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../Context/CartContext";
export default function ProductDetails() {
  const { addProductToCart } = useContext(CartContext);
  async function handleAddProductToCart(id) {
    setLoading(true);
    const res = await addProductToCart(id);
    toast.success(res.data.message);
    setLoading(false);
    console.log(res);
  }
  const { productId, categoryId } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["getProductDetails", productId],
    queryFn: () =>
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`),
    staleTime: 5000 * 1000,
  });
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  async function getProductDetails() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${productId}`
      );
      setProduct(data.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function getProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      const products = data.data
        .filter((product) => product.category._id === categoryId)
        .slice(0, 4);
      setRelatedProducts(products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getProductDetails();
    getProducts();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {isLoading && <Loading />}
      <div className="grid grid-cols-12 gap-6 my-24 shadow-[0px_5px_15px_rgba(22,163,74,0.1)] rounded-lg">
        <div className="col-span-12 md:col-span-4">
          <img
            className="max-w-64 md:max-w-full mx-auto rounded-lg p-2"
            src={data.data.data.imageCover}
            alt=""
          />
        </div>
        <div className="col-span-12 md:col-span-8 self-center text-gray-900 px-6">
          <h2 className="mb-2 text-2xl font-semibold ">
            {data.data.data.title}
          </h2>
          <p className="mb-3 text-gray-500">{data.data.data.description}</p>
          <p className="mb-3">{data.data.data.category.name}</p>
          <div className="flex justify-between">
            <span>{data.data.data.price}EGP</span>
            <span>
              <FaStar className="text-yellow-500 inline-block mr-1" />
              {data.data.data.ratingsAverage}
            </span>
          </div>
          <div className="flex justify-between mt-4">
            <button
              disabled={loading}
              onClick={() => handleAddProductToCart(productId)}
              className="w-full text-white bg-green-700 hover:bg-green-700 focus:ring-4 focus:ring-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none"
            >
              {loading ? <Loading /> : "Add to cart"}
            </button>
            <button className="hover:text-red-500 mt-2 h-min">
              <FaHeart className="text-xl" />
            </button>
          </div>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-center text-3xl m-6 p-4 shadow-[0px_5px_15px_rgba(22,163,74,0.1)] rounded-lg w-fit mx-auto">
            Products related to this item
          </h2>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {relatedProducts.length > 0 &&
          relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
}
