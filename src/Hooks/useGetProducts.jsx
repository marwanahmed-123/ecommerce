import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export function useGetProducts() {
  const getProducts = () =>
    axios.get("https://ecommerce.routemisr.com/api/v1/products");
  const {
    isLoading,
    error,
    isError,
    data: products,
    isFetching,
  } = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
    staleTime: 5000 * 1000,
    select: (data) => data.data.data,
  });
  return { isLoading, error, isError, products, isFetching };
}
