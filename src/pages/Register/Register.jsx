import axios from "axios";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { baseUrl } from "../../utils/api";
import * as yup from "yup";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

const Register = () => {
  const RegexPhone =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const passwordRegex = /^[A-Z]+[A-Za-z0-9!@$%^&]{8,}$/;
  // const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@$%^&]).{8,}$/;

  const navigagte = useNavigate();

  let validationSchema = yup.object({
    name: yup
      .string()
      .max(10, "Please enter a name with no more than 10 characters")
      .min(3, "Please enter a name with at least 3 characters.")
      .required("name is Required"),
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .required("Email Is Required"),
    phone: yup
      .string()
      .matches(RegexPhone, "Please enter a valid phone number.")
      .required("Phone is Required"),
    password: yup
      .string()
      .matches(
        passwordRegex,
        "Password must start with an uppercase letter and be at least 8 characters, including a combination of letters (uppercase and lowercase), numbers, and the special characters: !, @, $, %, ^, &."
      )
      .required("Password is Required"),
      rePassword: yup
  .string()
  .oneOf([yup.ref("password")], "Passwords do not match. Please make sure your passwords are identical.")
  .required("RePassword is Required"),
  });
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const mutation = useMutation(
    (values) => axios.post(`${baseUrl}/api/v1/auth/signup`, values),
    {
      onSuccess: (data) => {
        toast.success('success',{autoClose:1200,position:"top-center"})
        navigagte("/login");
      },
      onError: (error) => {
        console.error("Error submitting form:", error);
      },
    }
  );

  const handleSubmit = async (values) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });


  return (
    <section className="container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="text-[35px] text-center text-blueColor font-bold ">
        Shopping <span className="text-yellowColor">Hub</span>
      </h1>
      <Breadcrumbs className="mb-2 ">
        <Link to="/login" className="opacity-60">
          Login
        </Link>
        <Link to="/register">Sign Up</Link>
      </Breadcrumbs>
      <form
        onSubmit={formik.handleSubmit}
        className="mb-2 bg-whiteColor p-5 rounded-md">
        <h2 className=" text-[25px]">Register Form</h2>
        <h3 className="text-red-500 mb-5">{mutation.isError && mutation.error.response.data.message} </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div className=" ">
            <label className="font-semibold" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="inputForm w-full"
              placeholder="Enter Your Name..."
            />
            {formik.errors.name && formik.touched.name ? (
              <p className="text-red-500">{formik.errors.name}</p>
            ) : null}
          </div>
          <div className="">
            <label className="font-semibold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="inputForm w-full"
              placeholder="Enter Your Email..."
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="text-red-500">{formik.errors.email}</p>
            ) : null}
          </div>
        </div>

        <div className="mb-5">
          <label className="font-semibold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="inputForm w-full "
            placeholder="Enter Your Password..."
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="text-red-500">{formik.errors.password}</p>
          ) : null}
        </div>

        <div className="mb-5">
          <label className="font-semibold" htmlFor="rePassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="inputForm w-full "
            placeholder="Confirm Password..."
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="text-red-500">{formik.errors.rePassword}</p>
          ) : null}
        </div>

        <div className="mb-5">
          <label className="font-semibold" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="inputForm w-full "
            placeholder="Enter Your Phone..."
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p className="text-red-500">{formik.errors.phone}</p>
          ) : null}
        </div>

        <button   type="submit" className="btnForm">
          
          {mutation.isLoading && (
            <i className="fa-solid fa-spinner fa-spin mx-2"></i>
          )}
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default Register;
