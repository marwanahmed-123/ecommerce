import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export function useGetCategories() {
  const getCategories = () =>
    axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  const {
    isLoading,
    error,
    isError,
    data: categories,
    isFetching,
  } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
    staleTime: 5000 * 1000,
    select: (data) => data.data.data,
  });

  return { isLoading, error, isError, categories, isFetching };
}
