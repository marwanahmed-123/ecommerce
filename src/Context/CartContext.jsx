import { createContext, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const { token } = useContext(UserContext);
  const headers = {
    token,
  };
  function addProductToCart(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers,
        }
      )
      .then((r) => {
        return r;
      })
      .catch((e) => {
        return e;
      });
  }
  function getUserCartProducts() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((r) => {
        return r;
      })
      .catch((e) => {
        return e;
      });
  }
  function removeProductFromCart(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers,
      })
      .then((r) => {
        return r;
      })
      .catch((e) => {
        return e;
      });
  }
  function updateProductQuantity(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count,
        },
        {
          headers,
        }
      )
      .then((r) => {
        return r;
      })
      .catch((e) => {
        return e;
      });
  }
  function removeCart() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart/", { headers })
      .then((r) => {
        return r;
      })
      .catch((e) => {
        return e;
      });
  }
  function checkOutSession(cartId, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5137`,
        { shippingAddress: { shippingAddress } },
        { headers }
      )
      .then((r) => {
        return r;
      })
      .catch((e) => {
        return e;
      });
  }
  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getUserCartProducts,
        removeProductFromCart,
        updateProductQuantity,
        removeCart,
        checkOutSession,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
