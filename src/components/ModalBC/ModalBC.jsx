import { IoMdCloseCircle } from "react-icons/io";
import { Payment } from './../../context/paymentContext';
import { useContext, useRef } from "react";


const ModalBC = ({data}) => {
 const {image,name} = data
//
const {open,setOpen} = useContext(Payment)

const layer = useRef()
  return (
   <div
   onClick={(e)=>{
    console.log(e.target)
    if(e.target === layer.current) setOpen(false)
   }}
   ref={layer} className="fixed inset-0 z-[9999999] bg-black bg-opacity-[0.5] flex items-center justify-center">

    <div className="w-[50%]  text-center flex justify-center absolute  bg-white max-w-[80%] py-5  ">
        <div>
        <div className="">
        <img src={image} alt="" />
        </div>
        <h3 className="font-bold mt-2 text-blueColor text-[25px]">{name}</h3>
        </div>
        <IoMdCloseCircle onClick={()=>{
         setOpen(false);
       }}  className="absolute top-0 right-0 text-[30px] cursor-pointer"/>
    </div>
   </div>
  )
}

export default ModalBC
