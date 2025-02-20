import { useEffect, useState } from "react";
import Style from "./AllOrders.module.css";
export default function AllOrders() {
  const [testString, setTestString] = useState("test");
  useEffect(() => {}, []);
  return (
    <div>
      <h2 className={`${Style["bg-reeeed"]}`}>AllOrders compo </h2>
      <p>{testString} Lorem, ipsum dolor.</p>
    </div>
  );
}
