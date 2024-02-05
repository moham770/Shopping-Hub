import axios from 'axios'
import { baseUrl } from './../../utils/api';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import ModalBC from '../../components/ModalBC/ModalBC';
import { Suspense, useContext, useState } from 'react';
import { Payment } from './../../context/paymentContext';
import Loading from './../../components/Loading/Loading';
import Skeleton from 'react-loading-skeleton';

const Brands = () => {
const {open,setOpen} = useContext(Payment)
const [selected,setSelected] = useState(null)

    async function getBrands(){
        try {
            const {data} = await axios.get(`${baseUrl}/api/v1/brands`)
            return data.data
        } catch (error) {
            console.log('error',error)
       throw error
        }
     
    }

const {data} = useQuery('getBrands',getBrands)

function openModal(brand){
    setOpen(true)
    setSelected(brand)

}
const skelto = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

  return <>
  <h2 className='py-5 font-bold text-[25px] text-blueColor '>Brands</h2>
        {!data ?     <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 ">
         {skelto.map((skel) =>( <div key={skel} className='flex flex-col'>
             <Skeleton  className='h-[200px]' /> 
             <Skeleton  /> 
         </div>
             
             ))}
             </div>

     : <>
        
            <section className='grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 '>
            <Helmet>
        <title>Brands</title>
      </Helmet>

    
      {data && data.map((brand)=>{
            return <article 
           onClick={()=>{
            openModal(brand)
           }}
            key={brand._id}  className='shadow-lg hover:shadow-2xl hover:scale-[1.1] transition-all duration-200 cursor-pointer'>
                <img src={brand.image} alt="" />
                <h2 className='text-center text-blueColor font-bold '>{brand.name}</h2>
            </article>
        })
    }
  
{open ? < ModalBC data={selected} /> : null}    
    </section>
        
        </>}

        </>
}

export default Brands
