import { useState } from "react";
import Style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loading from "../loading/loading";
export default function Register() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(3, "Name is too short"),
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    rePassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    phone: Yup.string()
      .required("Phone is required")
      .matches(
        /^01[0125][0-9]{8}/,
        "Phone is not valid, only Egyptian numbers allowed"
      ),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: handleRegister,
    validationSchema: validationSchema,
  });
  async function handleRegister(values) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      if (data.message == "success") {
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      setErrorMsg("Email already exists");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="my-7 text-3xl border-l-gray-900">Register now</h2>
      <div className="mb-5">
        {formik.errors.name && formik.touched.name && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <span className="font-medium">{formik.errors.name}</span>
          </div>
        )}
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Name:
        </label>
        <input
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          type="text"
          id="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
        />
      </div>
      <div className="mb-5">
        {errorMsg ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <span className="font-medium">{errorMsg}</span>
          </div>
        ) : null}
        {formik.errors.email && formik.touched.email && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <span className="font-medium">{formik.errors.email}</span>
          </div>
        )}
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Email:
        </label>
        <input
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
        />
      </div>
      <div className="mb-5">
        {formik.errors.password && formik.touched.password && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <span className="font-medium">{formik.errors.password}</span>
          </div>
        )}
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Password
        </label>
        <input
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
        />
      </div>
      <div className="mb-5">
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <span className="font-medium">{formik.errors.rePassword}</span>
          </div>
        )}
        <label
          htmlFor="rePassword"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Re-Password:
        </label>
        <input
          name="rePassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rePassword}
          type="password"
          id="rePassword"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
        />
      </div>
      <div className="mb-5">
        {formik.errors.phone && formik.touched.phone && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <span className="font-medium">{formik.errors.phone}</span>
          </div>
        )}
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Phone:
        </label>
        <input
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          type="tel"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
        />
      </div>
      <div className="mb-5 flex justify-end">
        <button
          type="submit"
          className="text-gray-500 ring-2 text-2xl ring-gray-500 mb-5 focus:outline-none font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Register
        </button>
      </div>
      {loading ? <Loading /> : null}
    </form>
  );
}
