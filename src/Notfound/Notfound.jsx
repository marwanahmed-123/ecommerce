import { useEffect, useState } from "react";
import Style from "./Notfound.module.css";
import myImage from "../assets/error.svg";
export default function Notfound() {
  return (
    <>
      <img src={myImage} alt="" className="w-3/4 mx-auto" />
    </>
  );
}
