
import { FaBars } from "react-icons/fa";
import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react"
import { useState } from "react";
import {  NavLink } from "react-router-dom";
const NavigationBar = () => {
    const Links= ['Category','Brands','Orders']
    const LinksTo= ['category','brands','allorders']

    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
   
  return (
    <nav className='bg-blueColor text-white w-full  p-2 rounded-md md:mt-[77px]  mt-[134px]'>
      <div className="container">

     
      <ul className='ms-auto sm:flex gap-5 justify-end hidden '>
        {Links.map((link,i)=>(
            <NavLink to={`/${LinksTo[i]}`}  className="cursor-pointer hover:text-yellowColor  duration-200 transition-all" key={i}>{link}</NavLink>
        ))}
      </ul>
      <div onClick={openDrawer} className="flex justify-end cursor-pointer ">
      <FaBars className="text-yellowColor text-[30px] sm:hidden " />
      </div>
      <>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="text-blueColor font-semibold ">
            Shopping <span className="text-yellowColor">Hub</span>
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <List>
        {Links.map((link,i)=>(
            <NavLink  to={`/${LinksTo[i]}`}  className="cursor-pointer hover:text-yellowColor mb-2 duration-200 transition-all" key={i}>{link}</NavLink>
        ))}
       
        
        
       
      </List>
       
      </Drawer>
      
      
      </>
       </div>
    </nav>
  )
}

export default NavigationBar
