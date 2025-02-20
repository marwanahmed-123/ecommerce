import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import Loading from "../loading/loading";
import CartProductDetails from "../CartProductDetails/CartProductDetails";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function Cart() {
  const egyptianCities = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Shubra El Kheima",
    "Port Said",
    "Suez",
    "Luxor",
    "Asyut",
    "Ismailia",
    "Fayoum",
    "Zagazig",
    "Aswan",
    "Damietta",
    "Damanhur",
    "Beni Suef",
    "Hurghada",
    "Qena",
    "Sohag",
    "Minya",
    "Tanta",
  ];
  const validationSchema = Yup.object().shape({
    city: Yup.string()
      .required("city is required")
      .oneOf(egyptianCities, "City must be in egypt"),
    details: Yup.string()
      .required("details is required")
      .min(4, "details not enough"),
    phoneNumber: Yup.string()
      .required("Phone is required")
      .matches(
        /^01[0125][0-9]{8}/,
        "Phone is not valid, only Egyptian numbers allowed"
      ),
  });
  const formik = useFormik({
    initialValues: {
      city: "",
      phoneNumber: "",
      details: "",
    },
    onSubmit: handleCheckOutSession,
    validationSchema: validationSchema,
  });
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [cartDetails, setCartDetails] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showAdressForm, setShowAddressForm] = useState(false);
  function handleAddressForm() {
    if (numOfCartItems == 0) {
      setShowAddressForm(false);
      toast.error("Your cart is empty");
    } else setShowAddressForm(true);
  }
  const {
    getUserCartProducts,
    removeProductFromCart,
    updateProductQuantity,
    removeCart,
    checkOutSession,
  } = useContext(CartContext);
  async function handleGetUserCartProducts() {
    setIsLoading(true);
    const res = await getUserCartProducts();
    console.log(res);
    setTotalPrice(res.data.data.totalCartPrice);
    setNumOfCartItems(res.data.numOfCartItems);
    setCartId(res.data.cartId);
    setCartDetails(res.data.data);
    setCartProducts(res.data.data.products);
    setIsLoading(false);
  }
  async function handleRemoveProductFromCart(productId) {
    setIsLoading(true);
    const res = await removeProductFromCart(productId);
    toast.success(res.data.message);
    console.log(res);
    setIsLoading(false);
    setTotalPrice(res.data.data.totalCartPrice);
    setNumOfCartItems(res.data.numOfCartItems);
    setCartId(res.data.cartId);
    setCartDetails(res.data.data);
    setCartProducts(res.data.data.products);
  }
  async function handleUpdateProductQuantity(productId, count) {
    setIsLoading(true);
    const res = await updateProductQuantity(productId, count);
    console.log(res);
    setTotalPrice(res.data.data.totalCartPrice);
    setNumOfCartItems(res.data.numOfCartItems);
    setCartId(res.data.cartId);
    setCartDetails(res.data.data);
    setCartProducts(res.data.data.products);
    setIsLoading(false);
  }
  async function handleRemoveCart() {
    if (numOfCartItems != 0) {
      setIsLoading(true);
      const res = await removeCart();
      toast.success(res.data.message);
      console.log(res);
      setTotalPrice(0);
      setNumOfCartItems(0);
      setCartId(res.data.cartId);
      setCartDetails(null);
      setCartProducts(null);
      setIsLoading(false);
    } else toast.error("Your cart is empty");
  }
  async function handleCheckOutSession(shippingAddress) {
    if (numOfCartItems != 0) {
      setIsLoading(true);
      const res = await checkOutSession(cartId);
      location.href = res.data.session.url;
      setIsLoading(false);
    } else toast.error("Your cart is empty");
  }
  useEffect(() => {
    handleGetUserCartProducts();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="bg-gray-100 mt-12 p-10">
        <div className="flex justify-between mb-4">
          <div className="">
            <h2 className="text-3xl font-semibold mb-4">Cart Shop</h2>
            <p>
              total price:{" "}
              <span className="text-green-400 font-semibold">{totalPrice}</span>
            </p>
          </div>
          <div className=" text-end">
            <button
              onClick={handleAddressForm}
              type="button"
              className="self-end text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 mb-4"
            >
              check out
            </button>
            <p>
              Total number of items:{" "}
              <span className="text-green-500 font-semibold">
                {numOfCartItems}
              </span>
            </p>
          </div>
        </div>
        {numOfCartItems != 0 && (
          <>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right">
                <tbody>
                  {cartProducts.map((p) => (
                    <CartProductDetails
                      p={p}
                      key={p._id}
                      handleRemoveProductFromCart={handleRemoveProductFromCart}
                      handleUpdateProductQuantity={handleUpdateProductQuantity}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className=" m-10 mx-auto w-fit">
              <button
                onClick={handleRemoveCart}
                type="button"
                className="border-2 px-3 py-1 text-xl font-light border-solid hover:bg-green-400 transition-all hover:text-white hover:border-green-400 border-gray-500 rounded-md"
              >
                Clear your cart
                <FaTrash className=" inline-block ms-2 text-red-600" />
              </button>
            </div>
          </>
        )}
        {showAdressForm && numOfCartItems != 0 && (
          <>
            <div
              onClick={() => setShowAddressForm(false)}
              className="fixed inset-0 bg-gray-500/50 flex justify-center items-center"
            ></div>
            <form
              onSubmit={formik.handleSubmit}
              className="bg-white rounded-lg p-6 min-h-[65vh] min-w-[40%] flex flex-col gap-3 justify-around fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="">
                <h2 className="mb-4 text-3xl font-bold">
                  Shipping address form
                </h2>
                <div className="flex flex-col gap-2 justify-between h-full">
                  <div>
                    <datalist id="egyptianCities">
                      <option value="Cairo"></option>
                      <option value="Alexandria"></option>
                      <option value="Giza"></option>
                      <option value="Shubra El Kheima"></option>
                      <option value="Port Said"></option>
                      <option value="Suez"></option>
                      <option value="Luxor"></option>
                      <option value="Asyut"></option>
                      <option value="Ismailia"></option>
                      <option value="Fayoum"></option>
                      <option value="Zagazig"></option>
                      <option value="Aswan"></option>
                      <option value="Damietta"></option>
                      <option value="Damanhur"></option>
                      <option value="Beni Suef"></option>
                      <option value="Hurghada"></option>
                      <option value="Qena"></option>
                      <option value="Sohag"></option>
                      <option value="Minya"></option>
                      <option value="Tanta"></option>
                    </datalist>
                    <input
                      {...formik.getFieldProps("city")}
                      list="egyptianCities"
                      type="text"
                      placeholder="City"
                      className="rounded-lg border-gray-200 w-full"
                    />
                    {formik.errors.city && formik.touched.city && (
                      <div
                        className="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50"
                        role="alert"
                      >
                        <span className="font-medium">
                          {formik.errors.city}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      {...formik.getFieldProps("phoneNumber")}
                      type="text"
                      placeholder="Phone number"
                      className="rounded-lg border-gray-200 w-full"
                    />
                    {formik.errors.phoneNumber &&
                      formik.touched.phoneNumber && (
                        <div
                          className="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50"
                          role="alert"
                        >
                          <span className="font-medium">
                            {formik.errors.phoneNumber}
                          </span>
                        </div>
                      )}
                  </div>
                  <div>
                    <input
                      {...formik.getFieldProps("details")}
                      type="text"
                      placeholder="Details"
                      className="rounded-lg border-gray-200 w-full"
                    />
                    {formik.errors.details && formik.touched.details && (
                      <div
                        className="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50"
                        role="alert"
                      >
                        <span className="font-medium">
                          {formik.errors.details}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="buttons flex-col flex">
                <button
                  type="submit"
                  className="mt-5 px-3 py-2 rounded-lg bg-green-600 hover:bg-green-800 transition-all text-white"
                >
                  Proceed to payment
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddressForm(false)}
                  className="mt-5 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-800 transition-all text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
