import { useEffect, useState } from 'react';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md'

const UpToStart = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(()=>{
          window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            setIsVisible(scrollY > 100); 
          });
    },[])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };


  return (
    <button 
    onClick={scrollToTop}
    className={`bg-blueColor ${!isVisible && "hidden"} text-yellowColor w-[50px] h-[50px] text-[25px] centerElement rounded-full fixed bottom-3 right-3`}>

  <MdKeyboardDoubleArrowUp className='animate-movingUp' />
  
  
  </button> 
  ) 
}

export default UpToStart
