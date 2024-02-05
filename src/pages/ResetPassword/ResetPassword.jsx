import { Breadcrumbs, Button } from "@material-tailwind/react"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import * as yup from 'yup'
import { baseUrl } from './../../utils/api';
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from './../../context/UserContext';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const passwordRegex= /^[A-Z]+[A-Za-z0-9!@$%^&]{8,}$/ 
  const navigagte = useNavigate();
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const {setToken} = useContext(userContext)



    let validationSchema =  yup.object({
        email:yup.string().email('Please enter a valid email address.').required('Email Is Required'),
        newPassword:yup.string().matches(passwordRegex,'Password must start with an uppercase letter and be at least 8 characters, including a combination of letters (uppercase and lowercase), numbers, and the special characters: !, @, $, %, ^, &.').required('Password is Required'),
      })

      const initialValues={
        email:'',
        newPassword:'',
      }

      const mutation = useMutation((values)=>axios.put(`${baseUrl}/api/v1/auth/resetPassword`,values),{
        onSuccess: async (data)=>{
        console.log(data)
        toast.success('Succees Go to Login ',{position:"top-center",autoClose:1000})
            navigagte("/login");
      },onError:(error)=>{
        setError(error.response.data.message)
        console.log('error login =>',error)
        toast.error('error',{position:"top-center",autoClose:1000})
        throw error
      }
      })


      const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit:handleSubmit
      })



      async function handleSubmit(values){
        setLoading(true)
        try {
         await  mutation.mutateAsync(values)
         setLoading(false)
        } catch (error) {
          console.log('error handleSubmit => ',error)
         setLoading(false)
        }
      }



  return <section>
  <h2 className="font-bold text-[32px] text-blueColor text-center">Reset Your Password</h2>
  <form onSubmit={formik.handleSubmit}  className="border shadow-2xl  border-greyColor mt-5 flex flex-col items-center w-[500px] max-w-[100%] mx-auto h-[400px] justify-center">
    <Breadcrumbs>
      <Link to="/login" className="opacity-60">
        Login
      </Link>
      <Link to="/forgetpassword" className="opacity-60">
        Forget Password
      </Link>
      <Link to="/resetPassword">Reset Password</Link>
    </Breadcrumbs>


        <div className="flex flex-col w-[80%] my-3">
            <label htmlFor="email">Email :</label>
        <input id="email" type="email" value={formik.values.email} className="inputForm w-full" name="email"  onChange={formik.handleChange} onBlur={formik.handleBlur}  />
           {formik.touched.email && formik.errors.email ?<p className="text-red-700">{formik.errors.email}</p> :null} 
        </div>
        <div className="flex flex-col w-[80%]">
            <label htmlFor="newPassword">New Password:</label>
        <input id="newPassword" type="password" value={formik.values.newPassword} className="inputForm w-full" name="newPassword"  onChange={formik.handleChange} onBlur={formik.handleBlur}  />
        {formik.touched.newPassword && formik.errors.newPassword ?<p className="text-red-700">{formik.errors.newPassword}</p> :null} 
        </div>
        {error && <p className="text-red-700 mt-2">{error}</p>}
        <Button disabled={!(formik.dirty && formik.isValid) || loading}  type="submit" className="bg-blueColor mt-3">  {loading ? (
    <i className="fas fa-spinner fa-spin me-1"></i>
  ) : null}{' '} Reset </Button>
    </form>

  
  </section>
}

export default ResetPassword
