import { useEffect, useState } from "react";
import Style from "./Footer.module.css";
export default function Footer() {
  const [testString, setTestString] = useState("test");
  useEffect(() => {}, []);
  return (
    <div>
      <h2 className={`${Style["bg-reeeed"]}`}>Footer compo </h2>
      <p>{testString} Lorem, ipsum dolor.</p>
    </div>
  );
}
