import Loading from "../loading/loading";
import CategoryCard from "../CategoryCard/CategoryCard";
import { useGetCategories } from "../Hooks/useGetCategories";
export default function Category() {
  const { isLoading, error, isError, categories, isFetching } =
    useGetCategories();
  return (
    <>
      <h2 className="mx-auto text-4xl font-semibold text-green-600 w-fit my-8">
        All Brands
      </h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      )}
    </>
  );
}
