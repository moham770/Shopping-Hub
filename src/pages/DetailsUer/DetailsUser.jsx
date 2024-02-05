import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useContext } from "react";
import * as yup from "yup";
// @ts-ignore
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { baseUrl } from "./../../utils/api";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const DetailsUser = () => {
  const { getCartInfo,clearCart,setCartNumber } = useContext(CartContext);
  const { data } = useQuery("getCartInfo", getCartInfo);
  const navigate = useNavigate();
  const queryclient = useQueryClient()
  const RegexPhone =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  let validationSchema = yup.object({
    details: yup
      .string()
      .max(10, "Details must be less than 20 char")
      .min(3, "Details must be more than 3 char")
      .required("Details is Required"),
    phone: yup
      .string()
      .matches(RegexPhone, "Please enter a valid phone number.")
      .required("Phone is Required"),
    city: yup
      .string()
      .max(10, "City must be less than 10 char")
      .min(2, "City must be more than 3 char")
      .required("City is Required"),
  });

  // @ts-ignore
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    // onSubmit:paymentProccess
  });

  const onlineMutation = useMutation(
    (values) =>
      axios.post(
        // @ts-ignore
        `${baseUrl}/api/v1/orders/checkout-session/${data.data._id}?url=http://localhost:5173`,
        { shippingAddress: values },
        { headers: { token: localStorage.getItem("token") } }
      ),
    {
      onSuccess: (data) => {

        toast.success('success',{position:"top-center",autoClose:1000})
        open(data.data.session.url, "_self");
      },
      onError: (error) => {
        console.log(error);
        toast.error("Failed to initiate online payment.");
        throw error;
      },
    }
  );

  const cashMutation = useMutation((values) =>
    axios.post(
      `${baseUrl}/api/v1/orders/${data.data._id}`,
      { shippingAddress: values },
      { headers: { token: localStorage.getItem("token") } }
    ),{onSuccess:async (data)=>{
     
      await  toast.success(data.data.status,{position:"top-center",autoClose:1000})
      await setCartNumber(0)
      await navigate('/allorders')
    },onError:(error)=>{
      console.log('error',error)
      toast.error('error',{position:"top-center",autoClose:1000})
      throw error
    }}
  );

  return (
    <section>
      <h2 className="text-blueColor font-bold text-center text-[30px]">
        Online <span className="text-yellowColor">Payment</span>{" "}
      </h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="w-full">
          <// @ts-ignore
          Input
            label="details"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.details && formik.touched.details ? (
            <p className="text-red-700">{formik.errors.details}</p>
          ) : null}
        </div>
        <div className="w-full">
          <// @ts-ignore
          Input
            label="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p className="text-red-700">{formik.errors.phone}</p>
          ) : null}
        </div>
        <div className="w-full">
          <// @ts-ignore
          Input
            label="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.city && formik.touched.city ? (
            <p className="text-red-700">{formik.errors.city}</p>
          ) : null}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => {
              // @ts-ignore
              onlineMutation.mutate(formik.values);
            }}
            type="submit"
            className="bg-blueColor">
            Pay Online
          </Button>
          <Button onClick={() => {
            cashMutation.mutate(formik.values);
          }} type="submit" className="bg-yellowColor">
            Cash On Delevery
          </Button>
        </div>
      </form>
    </section>
  );
};

export default DetailsUser;
