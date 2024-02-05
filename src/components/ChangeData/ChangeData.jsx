import { Typography,Input, Button, Breadcrumbs } from "@material-tailwind/react"
import axios from "axios"
import { useFormik } from "formik"
import { useMutation } from "react-query"
import * as yup from "yup"
import { baseUrl } from './../../utils/api';
import { useContext, useState } from "react"
import { userContext } from "../../context/UserContext"
import { Link } from 'react-router-dom';
import { MdOutlineHome } from "react-icons/md"
import { toast } from "react-toastify"
const ChangeData = () => {
const RegexPhone =/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const [error ,setError] = useState(null)
    const [loading ,setLoading] = useState(false)
    const {token} = useContext(userContext)
    const headers ={
        token
    }

const initialValues ={
    name: "",
    email: "",
    phone: ""
}

let validationSchema =  yup.object({
    name: yup
    .string()
    .max(10, "Please enter a name with no more than 10 characters")
    .min(3, "Please enter a name with at least 3 characters.")
    .required("Name is Required"),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email Is Required"),
  phone: yup
    .string()
    .matches(RegexPhone, "Please enter a valid phone number.")
    .required("Phone is Required"),
  })



const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit:handelSubmit
})


const mutation = useMutation((vales)=>axios.put(`${baseUrl}/api/v1/users/updateMe`,vales,{headers}),{
    onSuccess:(data)=>{
      toast.success(data.data.message,{position:"top-center",autoClose:1000})
      console.log(data)
    },onError:(error)=>{
        console.log("error",error)
        toast.error('error',{position:"top-center",autoClose:1000})
        setError(error.response.data.message)
        throw error
    }
})

async function handelSubmit(values){
   setLoading(true)
    try {
    await mutation.mutateAsync(values)
 setLoading(false)

    } catch (error) {
        console.log('error',error)
 setLoading(false)
    }
}


    return <section className="">
    <Typography className="text-center font-bold text-blueColor text-[25px]"> Change Your information</Typography>
        <form onSubmit={formik.handleSubmit}>
          <h2 className="font-bold text-red-900">{error}</h2>
          <Breadcrumbs className="mb-2 ">
        <Link to="/" className="opacity-60 flex items-center text-[18px] gap-1">
        <MdOutlineHome /> Home
        </Link>
        <Link to="/settings/changeData">Change information</Link>
      </Breadcrumbs>
        <div className="w-full my-3">
          <Input label="New Name" type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.name && formik.errors.name ?<p className="text-red-600">{formik.errors.name }</p> :null}
        </div>
        <div className="w-full my-3">
          <Input label="New email" type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.email && formik.errors.email ?<p className="text-red-600">{formik.errors.email }</p> :null}
    
        </div>
        <div className="w-full my-3">
          <Input label="New phone" type="tel"  name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.touched.phone && formik.errors.phone ?<p className="text-red-600">{formik.errors.phone }</p> :null}
    
        </div>
    
    <Button type="submit" size="sm" className="bg-blueColor" disabled={!(formik.dirty && formik.isValid)} > {loading && <i className="fas fa-spinner fa-spin"></i>} Submit</Button>
    
        </form>
      </section>
}

export default ChangeData
