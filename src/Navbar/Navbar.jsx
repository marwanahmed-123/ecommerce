import { useContext, useEffect, useState } from "react";
import Style from "./Navbar.module.css";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { FaCartShopping } from "react-icons/fa6";
export default function Navbar() {
  const { isLoggedin, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  function logout() {
    setToken(null);
    navigate("/login");
  }
  const [pages, setPages] = useState([
    { text: "Home", path: "/" },
    { text: "Cart", path: "/cart" },
    { text: "Products", path: "/products" },
    { text: "Brands", path: "/brands" },
    { text: "Categories", path: "/categories" },
    { text: "Wish List", path: "/wishlist" },
  ]);
  const [authPages, setAuthPages] = useState([
    { text: "Login", path: "/login" },
    { text: "Register", path: "/register" },
  ]);
  return (
    <nav className="bg-gray-100 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center gap-4 mx-auto p-4 justify-between">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            fresh cart
          </span>
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex ml-auto items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="hidden w-full md:flex grow md:w-auto justify-around"
          id="navbar-default"
        >
          {isLoggedin && (
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
              {pages.map(({ text, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className="py-3 px-3 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0"
                  >
                    {text}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
          {isLoggedin && (
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
              <li>
                <NavLink
                  to={"/cart"}
                  className="block py-2 px-3 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 text-3xl"
                >
                  <FaCartShopping />
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => logout()}
                  className="block py-2 px-3 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
          {!isLoggedin && (
            <ul className="font-medium ml-auto flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
              {authPages.map(({ text, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className=" block py-2 px-3 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0"
                  >
                    {text}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
