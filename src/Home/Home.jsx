import Loading from "../loading/loading";
import ProductCard from "../ProductCard/ProductCard";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { useGetProducts } from "../Hooks/useGetProducts";
import { useState } from "react";

export default function Home() {
  const [searchProduct, setSearchProduct] = useState("");
  const { isLoading, error, isError, products, isFetching } = useGetProducts();
  const filterProducts = products
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchProduct.toLowerCase())
      )
    : [];
  return (
    <>
      <MainSlider />
      <CategorySlider />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <input
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-1 my-12 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-200"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filterProducts.length > 0 ? (
              filterProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
}
