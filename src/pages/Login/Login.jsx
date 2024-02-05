import { Breadcrumbs } from "@material-tailwind/react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from 'yup'
import axios from "axios"
import { useMutation, } from "react-query"
import { baseUrl } from "../../utils/api"
import { useContext } from "react"
import { userContext } from "../../context/UserContext"
import { toast } from "react-toastify";



const Login = () => {
  const passwordRegex= /^[A-Z]+[A-Za-z0-9!@$%^&]{8,}$/ 
  const navigagte = useNavigate();



  let validationSchema =  yup.object({
    email:yup.string().email('Please enter a valid email address.').required('Email Is Required'),
    password:yup.string().matches(passwordRegex,'Password must start with an uppercase letter and be at least 8 characters, including a combination of letters (uppercase and lowercase), numbers, and the special characters: !, @, $, %, ^, &.').required('Password is Required'),
  })

  
  const initialValues={
    email:'',
    password:'',
  }


  const {setToken} = useContext(userContext)

const mutation = useMutation((values)=> axios.post(`${baseUrl}/api/v1/auth/signin`,values),{
  onSuccess: async (data)=>{
  navigagte("/");
  setToken(data.data.token)
  localStorage.setItem('token',data.data.token)
 toast.success('Login Succefully',{autoClose:1200,position:"top-center",closeOnClick:true})
},onError:(error)=>{
  console.log('error login =>',error)
}
})

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit:handleSubmit
  })

async function handleSubmit(values){
  try {
   await  mutation.mutateAsync(values)
  } catch (error) {
    console.log('error handleSubmit => ',error)
  }
}



  return (
    <section className="container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="text-[35px] text-center text-blueColor font-bold ">
        Shopping <span className="text-yellowColor">Hub</span>
      </h1>
      <Breadcrumbs className="mb-2 ">
        <Link to="/login" >
          Login
        </Link>
        <Link to="/register" className="opacity-60">Sign Up</Link>
      </Breadcrumbs>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-whiteColor p-5 rounded-md">
        <h2 className="mb-2 text-[25px]">Login Form</h2>
        <h3 className="text-red-500 mb-5">{mutation.isError && mutation.error.response.data.message} </h3>
          <div className="mb-5">
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


        <div className=" mb-5">
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
            className="inputForm w-full"
            placeholder="Enter Your Password..."
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="text-red-500">{formik.errors.password}</p>
          ) : null}
        </div>

              <div>
            <Link className="hover:underline" to='/forgetpassword'>Forget Password ?</Link>
              </div>
              
        <button type="submit" className="btnForm">
        
         {mutation.isLoading && (
            <i className="fa-solid fa-spinner fa-spin mx-1"></i>
          )}
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
