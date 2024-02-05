import axios from "axios";
import { createContext, useContext, useState} from "react";
import { baseUrl } from '../utils/api';
import { useQueryClient } from "react-query";
import { userContext } from "./UserContext";
import { toast } from "react-toastify";

export const FavContext = createContext()

 export default function FavContextProvider({children}){
    const [NumberOfFav,setNumberOfFav] = useState(0)
    const {token} = useContext(userContext)

  const favIcon = document.getElementById('favIconNumber')

  const queryClient = useQueryClient()

    const headers ={
        token
    }
     async function displayWishList(){
        if(!token) return
        try {
            const {data} = await axios.get(`${baseUrl}/api/v1/wishlist`,{headers})
            setNumberOfFav(data.count)
            return data
        } catch (error) {
            throw error
            
        }
     }

     async function addProductToWishList(productId){  
        try {
            const {data} = await axios.post(`${baseUrl}/api/v1/wishlist`,{productId},{headers})
          await  queryClient.invalidateQueries('displayWishList')
           await toast.success(data.message,{autoClose:1000,position:"top-center"})
           await    setNumberOfFav(data.data.length)
         await   favIcon.classList.add('fa-bounce')
        await    setTimeout(()=>{
                favIcon.classList.remove('fa-bounce')
              },1000)
        

        } catch (error) {
            toast.error(error.response.data.statusMsg,{autoClose:1000,position:"top-center"})
console.log(error)
            throw error
        }

     }


     async function deleteWishList(id){
        try {
            const {data} = await axios.delete(`${baseUrl}/api/v1/wishlist/${id}`,{headers})
            await queryClient.invalidateQueries('displayWishList')
            toast.success(data.message,{autoClose:1000,position:"top-center"})
            await favIcon.classList.add('fa-bounce')
            await setTimeout(()=>{
               favIcon.classList.remove('fa-bounce')
             },1000)
            
        } catch (error) {
            toast.error('error Deleting Item',{autoClose:1000,position:"top-center"})
            
            console.log('error',error)
            throw error
        }
     }


    return <FavContext.Provider value={{NumberOfFav,setNumberOfFav,displayWishList,addProductToWishList,deleteWishList}}>
    {children}
    </FavContext.Provider>

  
}