import { useEffect, useState } from "react";
import Style from "./TemplateName.module.css";
export default function TemplateName() {
  const [testString, setTestString] = useState("test");
  useEffect(() => {}, []);
  return (
    <div>
      <h2 className={`${Style["bg-reeeed"]}`}>TemplateName compo </h2>
      <p>{testString} Lorem, ipsum dolor.</p>
    </div>
  );
}
