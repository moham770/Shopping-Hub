import axios from 'axios'

import { baseUrl } from './../../utils/api';
import { jwtDecode } from 'jwt-decode';
import { useQuery } from 'react-query';
import { FaStar } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { Helmet } from 'react-helmet';


const Orders = () => {
  const {data, isLoading} = useQuery('getOrders',getOrders)

console.log(data&& data)
 const {id} = jwtDecode(localStorage.getItem('token'))
 console.log(id)
  async function getOrders(){
    try {
      const data =  await axios.get(`${baseUrl}/api/v1/orders/user/${id}`)
      return data.data
    } catch (error) {
      console.log('error')
      throw error
    }
  }

  
  return <section className='my-9'>
        <Helmet>
        <title>Orders</title>
      </Helmet>
      <h2 className='text-blueColor font-bold text-[25px] underline underline-offset-2 my-5'>All Orders ({data && data.length}) </h2>
     {data && data.length === 0 ? <h2 className='text-red-800 font-bold text-[32px]  text-center   '>No Orders Yet</h2>:null}  
      {isLoading ? <>
        <div className="grid grid-cols-2 gap-5">
      <Skeleton className='col-span-1 h-[200px]'  />
      <Skeleton className='col-span-2 h-[200px]'  />
      <Skeleton className='col-span-1 h-[200px]'  />
      <Skeleton className='col-span-2 h-[200px]'  />
      <Skeleton className='col-span-1 h-[200px]'  />
      <Skeleton className='col-span-2 h-[200px]'  />
        </div>
   
 
      
      </> : <>
      {data && data.reverse().map((order,i)=>{
return  <div key={i}  className="grid md:grid-cols-8 gap-5 mb-5 bg-gray-200 p-2  rounded-[5px]">
  <div className="border col-span-2">
  <h4 className='font-bold'>Details Order {data.length -i}</h4>
  <h4 className='capitalize'>isDelivered :<span className={order.isDelivered==false ? 'text-red-500 font-bold' :'text-green-500 font-bold'}>{order.isDelivered.toString()}</span> </h4>
  <h4 className='capitalize'>isPaid :<span className={order.isPaid==false ? 'text-red-500 font-bold' :'text-green-500 font-bold'}>{order.isPaid.toString()}</span></h4>
  <h4>paidAt:<span  className='text-green-500 font-bold'>{order.createdAt}</span></h4>
  <h4>Location: <span className='text-blueColor font-bold'>{order.shippingAddress.city}</span> </h4>
  <h4>Phone:<span className='text-blueColor font-bold'>{order.shippingAddress.phone}</span></h4>
  <h4>Note:<span className='text-blueColor font-bold'>{order.shippingAddress.details}</span></h4>

</div>
<div className="border col-span-6 overflow-auto ">
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 overflow-auto gap-4">
{order.cartItems.map((item,i)=>{
  return <div key={item.product.id} className='border-[1.5px] border-yellowColor rounded-[5px]'>
    <img src={item.product.imageCover} alt={item.product.title} />
    <h4 className='text-center font-bold text-blueColor '>{item.product.title.split(' ').slice(0,2).join(' ')}</h4>
    <div className="flex justify-between px-2">
      <h4> <span className='font-bold'>Count:</span> {item.count}</h4>
      <h4 className='flex gap-1 items-center font-bold'>{item.product.ratingsAverage} <FaStar className='text-yellowColor' /></h4>
    </div>
    <h4 className='px-2'> <span className='font-bold'>Price:</span> {item.price} EGP</h4>

  </div>
})}
</div>
  <h4 className='bg-gray-400 mt-3 text-blueColor font-bold text-center text-[20px]'>Total Order Price:{order.totalOrderPrice}EGP</h4>
</div>

</div>
      })}
     </>}
  </section>
}

export default Orders
