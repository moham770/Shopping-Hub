import { Breadcrumbs, Button } from "@material-tailwind/react"
import axios from "axios"
import { baseUrl } from "../../utils/api"
import { useMutation } from "react-query"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


const VerifyResetCode = () => {
    const [code,setCode] = useState('')
    const [error,setError] = useState(null)
    const navigate = useNavigate()

async function veryfyCode(resetCode){
    const {data}= await axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`,{"resetCode":resetCode})
    console.log(data)
} 


const mutation = useMutation((resetCode)=>veryfyCode(resetCode),{
    onSuccess:(data)=>{
        toast.success('success',{position:"top-center",autoClose:1000})
        navigate('/resetPassword')
    },onError:(error)=>{
        setError(error.response.data.message)
        console.log('error',error)
        toast.error('error',{position:"top-center",autoClose:1000})
        throw error
    }
})

const handleVerify = (e) => {
    e.preventDefault();
    mutation.mutate(code); 
  };




  return <>
  <h2 className='font-bold text-[32px] text-blueColor text-center '>Verify Reset Code</h2>
    <form onSubmit={handleVerify}  className="border shadow-2xl border-greyColor mt-5 flex flex-col items-center w-[500px] max-w-[100%] mx-auto h-[200px] justify-center">
    <Breadcrumbs>
      <Link to="/login" className="opacity-60">
        Login
      </Link>
      <Link to="/forgetpassword" className="opacity-60">
      Forget Password
      </Link>
      <Link to="/VerifyResetCode">Verify Code</Link>
    </Breadcrumbs>
        <div className="my-2">
        <label htmlFor="code" className="font-bold text-blueColor">Code:</label>
        <input value={code} onChange={(e)=>{setCode(e.target.value)}} type="text" className="inputForm w-full" />
        </div>
        {error && <p className="text-red-700 mt-2">{error}</p>}
        <Button disabled={code === ""} type="submit" className="bg-blueColor mt-3"> {mutation.isLoading ? <i className="fas fa-spinner fa-spin me-1"></i>:null} Verify</Button>
    </form>
  
  </>
}

export default VerifyResetCode
