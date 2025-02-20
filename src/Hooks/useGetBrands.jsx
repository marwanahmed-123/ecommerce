import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export function useGetBrands() {
  const getBrands = () =>
    axios.get("https://ecommerce.routemisr.com/api/v1/brands");

  const {
    isLoading,
    error,
    isError,
    data: brands,
    isFetching,
  } = useQuery({
    queryKey: ["getBrands"],
    queryFn: getBrands,
    staleTime: 5000 * 1000,
    select: (data) => data.data.data,
  });

  return { isLoading, error, isError, brands, isFetching };
}
