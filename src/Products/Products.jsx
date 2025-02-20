import Loading from "../loading/loading";
import ProductCard from "../ProductCard/ProductCard";
import { useGetProducts } from "../Hooks/useGetProducts";
export default function products() {
  const { isLoading, error, isError, products, isFetching } = useGetProducts();
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
