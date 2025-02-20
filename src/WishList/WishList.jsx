import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { getUseGetUserWishList } from "../Hooks/useGetUserWishList";
import { jwtDecode } from "jwt-decode";
export default function WishList() {
  const { token } = useContext(UserContext);
  const [userId, setUserId] = useState("");
  function getUserIdFromToken() {
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    } catch (error) {
      console.error("Invalid token", error);
      setUserId("sssss");
    }
  }
  useEffect(() => {
    getUserIdFromToken();
  }, []);

  const { isLoading, error, isError, wishlistProducts, isFetching } =
    getUseGetUserWishList(userId);
  return <>{console.log(token)}</>;
}
