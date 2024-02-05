import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { baseUrl } from './../../utils/api';
import { Payment } from './../../context/paymentContext';
import ModalBC from '../../components/ModalBC/ModalBC';
import Skeleton from 'react-loading-skeleton';

const Category = () => {
  // const {open,setOpen} = useContext(Payment)
// const [selected,setSelected] = useState(null)



    async function getCategories(){
        try {
            const {data} = await axios.get(`${baseUrl}/api/v1/categories`)
            return data.data
        } catch (error) {
            console.log('error',error)
       throw error
        }
    }

const {data} = useQuery('getCategories',getCategories)

// function openModal(category){
//   setOpen(true)
//   setSelected(category)

// }
const skelto = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]


  return (
    <>
          <h2 className='py-5 font-bold text-[25px] text-blueColor '>Categories</h2>
    {!data ? <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 ">
         {skelto.map((skel) =>( <div key={skel} className='flex flex-col'>
             <Skeleton  className='h-[200px]' /> 
             <Skeleton  /> 
         </div>
             
             ))}
             </div>: <section className='grid grid-cols-2  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 '>
            <Helmet>
        <title>Category</title>
      </Helmet>


    {data && data.map((category)=>{
        return <article 
        key={category._id}  className='shadow-lg  hover:shadow-2xl hover:scale-[1.1] my-5 transition-all rounded-[5px] duration-200 border border-blueColor   '>
            <img src={category.image} className='h-full ' alt={category.name}  style={{objectFit:'cover',objectPosition:'center'}}/>
            <h3 className="  text-center  font-bold  bg-yellowColor text-white   ">{category.name}</h3>

        </article>
    })}

</section> 
   }
</>
  )
}

export default Category
