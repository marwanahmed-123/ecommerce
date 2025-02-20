import Loading from "../loading/loading";
import BrandCard from "../BrandCard/BrandCard";
import { useGetBrands } from "../Hooks/useGetBrands";
export default function Brands() {
  const { isLoading, error, isError, brands, isFetching } = useGetBrands();
  return (
    <>
      <h2 className="mx-auto text-4xl font-semibold text-green-600 w-fit my-8">
        All Brands
      </h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {brands.map((brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      )}
    </>
  );
}
