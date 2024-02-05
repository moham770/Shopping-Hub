import React from 'react'
import { FaEnvelope } from 'react-icons/fa'
import { IoMdCall } from 'react-icons/io'

const Footer = () => {
  return (
    <section className='bg-[#212529] text-white p-20 mt-32'>
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:text-center md:text-left ">
            <div className="">
                <h2 className='mb-3'>Links</h2>
                <ul className="flex flex-col gap-2 ">
                    <li  className='cursor-pointer opacity-[0.6] hover:opacity-[1] transition-all duration-200'>About Us</li>
                    <li className='cursor-pointer opacity-[0.6] hover:opacity-[1] transition-all duration-200'>Contact Us</li>
                    <li className='cursor-pointer opacity-[0.6] hover:opacity-[1] transition-all duration-200'>Blog</li>
                    <li className='cursor-pointer opacity-[0.6] hover:opacity-[1] transition-all duration-200'>FAQ's</li>
                </ul>
            </div>
            <div className="">
            <h2 className='mb-3'>Policies</h2>
            <ul className="flex flex-col gap-2 ">
                    <li  className='cursor-pointer opacity-[0.6] hover:opacity-[1] transition-all duration-200'>Terms & Conditions</li>
                    <li className='cursor-pointer opacity-[0.6] hover:opacity-[1] transition-all duration-200'>Cookies Policy</li>
                    <li className='cursor-pointer opacity-[0.6] hover:opacity-[1] transition-all duration-200'>Data Policy</li>
                </ul>
            </div>
            <div className=""><h2 className='mb-3'>About Shopping Hub</h2>
            <ul className="flex flex-col gap-2 ">
                    <li  className='cursor-pointer opacity-[0.6] hover:opacity-[1] transition-all duration-200'>Company Info</li>
                    <li className='cursor-pointer opacity-[0.6] hover:opacity-[1] transition-all duration-200'>Branches</li>
                    <li className='cursor-pointer opacity-[0.6] hover:opacity-[1] transition-all duration-200'>store</li>
                </ul>
            </div>
            <div className=""><h2 className='mb-3'>Contact</h2>
            <ul className="flex flex-col gap-2 sm:items-center md:items-stretch ">
                    <li  className='cursor-pointer opacity-[0.6] hover:opacity-[1] transition-all duration-200 flex gap-2 items-center '><IoMdCall /> +678 004 5754</li>
                    <li className='cursor-pointer opacity-[0.6] hover:opacity-[1] transition-all duration-200 flex gap-2 items-center'> <FaEnvelope /> info@shophub.com</li>
                </ul>
            
            </div>

  
        </div>
    </section>
  )
}

export default Footer
