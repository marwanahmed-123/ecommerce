import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export function getUseGetUserWishList(userId) {
  const getUserWishList = () =>
    axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist/${userId}`);
  const {
    isLoading,
    error,
    isError,
    data: wishlistProducts,
    isFetching,
  } = useQuery({
    queryKey: ["getUserWishList"],
    queryFn: getUserWishList,
    staleTime: 5000 * 1000,
    select: (data) => data.data.data,
  });
  return { isLoading, error, isError, wishlistProducts, isFetching };
}
