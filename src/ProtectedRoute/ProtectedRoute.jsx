import { useContext, useEffect, useState } from "react";
import Style from "./ProtectedRoute.module.css";
import { UserContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const { isLoggedin } = useContext(UserContext);
  if (isLoggedin) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
