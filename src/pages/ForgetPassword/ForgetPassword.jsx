import { Breadcrumbs, Button } from "@material-tailwind/react"
import axios from "axios"
import { useFormik } from "formik"
import * as yup from 'yup'
import { baseUrl } from './../../utils/api';
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";


const ForgetPassword = () => {
    const navigate = useNavigate()
    const [error,setError] = useState(null)


    let validationSchema =  yup.object({
        email:yup.string().email('Please enter a valid email address.').required('Email Is Required'),
      })

    const initialValues={
        email:'',
      }



      const mutation = useMutation((email)=> axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`,email ),{
        onSuccess: async (data)=>{
            toast.success('Verify Reset Code')
            navigate('/VerifyResetCode')
        },onError:(error)=>{
            console.log('error',error)
            setError(error.response.data.message)
            throw error
        }
    })


   const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit:handleSubmit
      })

      async function handleSubmit(values) {
        console.log('Setting loading to true');
        try {
       
          await mutation.mutate(values);
      
          console.log('Setting loading to false (success)');
        } catch (error) {
          console.error('Error:', error);
          console.log('Setting loading to false (error)');
        }
     

      }





  return <section>
    <h2 className="font-bold text-[32px] text-blueColor text-center underline ">Account Recovery</h2>
    <form onSubmit={formik.handleSubmit}>
    <Breadcrumbs className="my-3">
      <Link to="/login" className="opacity-60">
        Login
      </Link>
      <Link to="/forgetpassword" >
      Forget Password
      </Link>
    </Breadcrumbs>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email"  className="inputForm w-full"
            placeholder="Enter Your Email..."
         name="email"
         value={formik.values.email}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? <p className="text-red-700">{formik.errors.email}</p>:null}
           {error && <p className="text-center text-red-800 font-bold">{error}</p>} 
            <div className="text-center mt-5">
                <Button  disabled={!(formik.dirty && formik.isValid) || mutation.isLoading} type="submit" className="bg-blueColor"> {mutation.isLoading ? <i className="fas fa-spinner fa-spin me-1"></i> : null} Recovery</Button>
            </div>

    </form>
  </section>
}

export default ForgetPassword
