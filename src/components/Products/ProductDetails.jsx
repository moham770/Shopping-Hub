import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { baseUrl } from "../../utils/api";
import { FaStar } from "react-icons/fa6";
import { Button } from "@material-tailwind/react";
import { TiShoppingCart } from "react-icons/ti";
import Loading from "../Loading/Loading";
import { useContext, useEffect, useRef, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { CartContext } from '../../context/CartContext';


const ProductDetails = ({ productid, setDetailsModal }) => {
  const layer = useRef();
  const [sourc, setSourc] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const {addProductToCart,getCartInfo} = useContext(CartContext);
  const [addedtocart,setaddedtocart] = useState(false)

  async function getProductDetails() {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/v1/products/${productid}`
      );
      return data.data;
    } catch (error) {
      console.log("getProductDetails =>", error);
    }
  }

  const { data, isLoading } = useQuery(`getProductDetails`, getProductDetails);

  const handleClickOutside = (e) => {
    if (layer.current && !layer.current.contains(e.target)) {
      setDetailsModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDetailsModal]);

   function handleImageClick(i){
    setActiveImage(i)
   }




   const { data:dataCart } = useQuery("getCartInfo", getCartInfo);



const ISINCART = dataCart&& dataCart.data.products.some((prod)=>prod.product.id === productid)





const mutation = useMutation((productid)=>addProductToCart(productid),{
  onSuccess:(data)=>{

    setaddedtocart(true)
  },onError:(error)=>{
    console.log('addProductToCart Product Details =>', error)
    throw error
  }
})





  return (
    <>
    {isLoading && <Loading />}
    <div className="fixed  flex justify-center inset-0 md:pt-[70px]  pt-[100px]  bg-gray-300 overflow-y-scroll  z-[99999] bg-opacity-[0.4] ">
      
      {data && (
        <div
          ref={layer}
          className="w-[900px] absolute  left-[50%] translate-x-[-50%]   bg-white max-w-[70%] p-2 rounded-md  grid grid-cols-1  md:grid-cols-2 gap-5 items-center justify-between">
          <div className=" flex flex-col gap-4">
            <div>
              <img src={sourc ? sourc : data?.imageCover} alt={data?.title} />
            </div>
            <div className="flex gap-2  flex-wrap mx-auto text-center">
              {data?.images.map((img,index) => (
                <img
                key={index}
                  onClick={() => {
                    setSourc(img);
                    handleImageClick(index)
                   
                  }}
                  className={`w-[50px] sm:w-[55px]  rounded-md border border-blueColor cursor-pointer ${activeImage ===index ? `activeImg`: null}`}
                  src={img}
                  alt={data?.title}
                 
                />
              ))}
            </div>
          </div>
          <div className="">
            <h2 className="text-blueColor  font-semibold text-[20px] sm:text-[30px] text-center mb-2">
              
              {data?.title.split(" ").slice(0, 2).join(" ")}
            </h2>
            <h2 className="text-gray-600  font-semibold mb-2 ">
              
              {data?.description}
            </h2>

            <h3 className="font-semibold text-blueColor text-[18px]">
              Quantity: <span className="font-normal">{data?.quantity}</span>
            </h3>

            <h3 className="font-semibold text-blueColor text-[18px]">
              Category:
              <span className="font-normal">{data?.category.name}</span>
            </h3>

            <div className="flex items-center justify-between mb-3  gap-1">
              <h3 className="font-semibold text-blueColor flex gap-2 text-[18px]">
                Price:
                <span className="text-yellowColor  font-semibold ">
                  
                  {data?.price} EGP
                </span>
              </h3>

              <h3 className="font-semibold text-blueColor flex gap-2">
                {data?.ratingsAverage}
                <span className="font-normal text-yellowColor">
                  <FaStar />
                </span>
              </h3>
            </div>

            <div className="bg-gray-500 my-3 h-[1px] " />
            <Button
            disabled={ISINCART || addedtocart}

            onClick={()=>{
              mutation.mutate(productid)
            
            }}
              variant="filled"
              className="flex items-center gap-3 bg-blueColor">
                {mutation.isLoading? <i className="fas fa-spinner fa-spin text-[20px] "></i> : <TiShoppingCart className="text-[20px]" /> }
                {ISINCART || addedtocart ? "Product added to your cart ":' Add To Cart'}
            </Button>
          </div>

       <IoMdCloseCircle onClick={()=>{
         setDetailsModal(false);
       }}  className="absolute top-0 right-0 text-[30px] cursor-pointer"/>


        </div>
        
      )}
    </div>
    </>
    
  );
};

export default ProductDetails;
