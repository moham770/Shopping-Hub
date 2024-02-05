import React from 'react'
import Skeleton from 'react-loading-skeleton'
const looped= [1,2,3,4,5,6,7,8,9,10]

const SkeltonProducts = () => {
  return <>
  {looped.map((skel,i)=><div key={i}>
    <Skeleton className='h-[200px]'/>
    <Skeleton/>
    <Skeleton/>
  </div>)}
    
  
  </>
}

export default SkeltonProducts
