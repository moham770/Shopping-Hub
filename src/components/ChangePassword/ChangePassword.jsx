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
import { toast } from 'react-toastify';

const ChangePassword = () => {
    const passwordRegex= /^[A-Z]+[A-Za-z0-9!@$%^&]{8,}$/ 
    const [error ,setError] = useState(null)
    const [loading ,setLoading] = useState(false)
    const {token} = useContext(userContext)
    const headers ={
        token
    }

const initialValues ={
    currentPassword:"",
    password:"",
    rePassword:""
}

let validationSchema =  yup.object({
    currentPassword:yup.string().matches(passwordRegex,'Password must start with an uppercase letter and be at least 8 characters, including a combination of letters (uppercase and lowercase), numbers, and the special characters: !, @, $, %, ^, &.').required('Current Password is Required'),
    password:yup.string().matches(passwordRegex,'Password must start with an uppercase letter and be at least 8 characters, including a combination of letters (uppercase and lowercase), numbers, and the special characters: !, @, $, %, ^, &.').required('New Password is Required'),
    rePassword:yup.string().matches(passwordRegex,'Password must start with an uppercase letter and be at least 8 characters, including a combination of letters (uppercase and lowercase), numbers, and the special characters: !, @, $, %, ^, &.').required('Re New Password is Required'),
  })



const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit:handelSubmit
})


const mutation = useMutation((vales)=>axios.put(`${baseUrl}/api/v1/users/changeMyPassword`,vales,{headers}),{
    onSuccess:(data)=>{
      toast.success(data.data.message,{position:"top-center",autoClose:1000})
    },onError:(error)=>{
        console.log("error",error)
        setError(error.response.data.message)
        toast.error('error',{position:"top-center",autoClose:1000})
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
<Typography className="text-center font-bold text-blueColor text-[22px] md:text-[25px]"> Change Your Pasword</Typography>
    <form onSubmit={formik.handleSubmit}>
      <h2 className="font-bold text-red-900 ">{error}</h2>
      <Breadcrumbs className="mb-2 ">
        <Link to="/" className="opacity-60 flex items-center md:text-[18px] gap-1">
        <MdOutlineHome /> Home
        </Link>

        <Link to="/settings/changePassword">Change Password</Link>
      </Breadcrumbs>
    <div className="w-full my-3">
      <Input label="Current Password" type="password" name="currentPassword" value={formik.values.currentPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      {formik.touched.currentPassword && formik.errors.currentPassword ?<p className="text-red-600">{formik.errors.currentPassword }</p> :null}
    </div>
    <div className="w-full my-3">
      <Input label="New Password" type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      {formik.touched.password && formik.errors.password ?<p className="text-red-600">{formik.errors.password }</p> :null}

    </div>
    <div className="w-full my-3">
      <Input label="Re New Password" type="password"  name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.touched.rePassword && formik.errors.rePassword ?<p className="text-red-600">{formik.errors.rePassword }</p> :null}

    </div>

<Button type="submit" size="sm" className="bg-blueColor" disabled={!(formik.dirty && formik.isValid)} > {loading && <i className="fas fa-spinner fa-spin"></i>} Submit</Button>

    </form>
  </section>
}

export default ChangePassword
