import { useEffect, useState } from "react";
import Style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
export default function Layout() {
  useEffect(() => {}, []);
  return (
    <>
      <Navbar />
      <div className="xl:max-w-screen-xl container mx-auto">
        <Outlet />
      </div>
    </>
  );
}
