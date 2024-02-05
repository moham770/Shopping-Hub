import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { baseUrl } from "./../utils/api";
import {   useQueryClient } from "react-query";
import { userContext } from "./UserContext";
import { toast } from "react-toastify";


export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartNumber, setCartNumber] = useState(0);
  

    const queryClient = useQueryClient()
  const {token} = useContext(userContext)

  

  const headers = {
    token
  };


  async function getCartInfo() {
    if(!token) return  
      try {
        const { data } = await axios.get(`${baseUrl}/api/v1/cart`, { headers });
        if(data.status ==='success'){
          setCartNumber(data.numOfCartItems);
        }
        return data
    } catch (error) {
      // console.log("getCartInfo =>", error);
      // throw error;
    }
  }


  const cartIcon =  document.getElementById('cartIconNumber')


  async function addProductToCart(productId) {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/cart`,
        {
          productId
        },
        { headers }
      );
      await queryClient.invalidateQueries('getCartInfo')
      await cartIcon.classList.add('fa-bounce')
     await setTimeout(()=>{
        cartIcon.classList.remove('fa-bounce')
      },1000)
   await   toast.success(data.message,{position:"top-center",autoClose:1000})
      return data
    } catch (error) {
      throw error;
    }
}

async function clearCart(){
try {
  const {data} =  await axios.delete(`${baseUrl}/api/v1/cart`,{headers})
  await cartIcon.classList.add('fa-bounce')
  await setTimeout(()=>{
    cartIcon.classList.remove('fa-bounce')
  },1000)
  await queryClient.invalidateQueries('getCartInfo')
   await toast.success(data.message,{position:'top-center',autoClose:1000})
   await setCartNumber(0)
  return data
} catch (error) {
    console.log('error Clear Cart =>',error)
    toast.error('Failed Deleting Your Cart');
    throw error
}
}

async function updateCount(values){
    if( values.count < 1){
        toast.error('sorry you cant do this')
        return
    }
    try {
        const {data} = await axios.put(`${baseUrl}/api/v1/cart/${values.id}`,{count:values.count}, {headers})
  
        await queryClient.invalidateQueries('getCartInfo')
      toast.success(data.status,{position:"top-center",autoClose:1000})
        return data
    } catch (error) {
        console.log('error update count ', error)
        toast.error('faild Update Count')
        throw error
    }
}

async function deleteItem(id){
    
    try {
    const {data} = await axios.delete(`${baseUrl}/api/v1/cart/${id}`,{headers})
    await queryClient.invalidateQueries('getCartInfo')
    await cartIcon.classList.add('fa-bounce')
    await setTimeout(()=>{
       cartIcon.classList.remove('fa-bounce')
     },1000)
   await toast.success('item Deleted Succefully',{position:"top-center",autoClose:1000})

     
    } catch (error) {
        console.log('deleteItem ', error)
        toast.error('delete Item')
        throw error
    }


}



  return (
    <CartContext.Provider value={{ cartNumber,setCartNumber, getCartInfo,addProductToCart ,clearCart ,updateCount ,deleteItem}}>
      {children}
    </CartContext.Provider>
  );
}
