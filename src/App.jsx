import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home/Home";
import Layout from "./Layout/Layout";
import Cart from "./Cart/Cart";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Products from "./Products/Products";
import Categories from "./Categories/Categories";
import Brands from "./Brands/Brands";
import Notfound from "./Notfound/Notfound";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ProductDetails from "./ProductDetails/ProductDetails";
import toast, { Toaster } from "react-hot-toast";
import AllOrders from "./AllOrders/AllOrders";
import WishList from "./WishList/WishList";
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "*", element: <Notfound /> },
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: <ProtectedRoute>{<Cart />}</ProtectedRoute>,
        },
        {
          path: "/brands",
          element: <ProtectedRoute>{<Brands />}</ProtectedRoute>,
        },
        {
          path: "/products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/productDetails/:productId/:categoryId",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
