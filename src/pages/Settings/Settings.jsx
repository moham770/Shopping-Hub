import React from "react";
import {
  IconButton,
  Typography,
  ListItem,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Outlet, useNavigate } from "react-router-dom";
import { FaKey } from "react-icons/fa";
import { DiDatabase } from "react-icons/di";
import { Helmet } from "react-helmet";


const Settings = () => {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
   const navigate = useNavigate()
  
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);
   
  return <section>
        <Helmet>
        <title>Settings</title>
      </Helmet>
    <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-12">
    <div className="col-span-1 md:col-span-1 lg:col-span-2 ">
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <Typography variant="h4" className="text-blueColor font-bold">
             Shopping <span className="text-yellowColor">Hub</span> 
            </Typography>
          </div>
          <hr />
          <ListItem onClick={()=>{navigate('/settings/changePassword')}}>
                  <Typography  color="blue-gray" className="mr-auto font-normal flex gap-2 items-center">
                    Change Password <FaKey />
                  </Typography>
          </ListItem>
          <ListItem onClick={()=>{navigate('/settings/changeData')}}>
                  <Typography  color="blue-gray" className="mr-auto font-normal flex gap-2 items-center">
                    Change Information <DiDatabase />
                  </Typography>
          </ListItem>
      
       
        </Card>
      </Drawer>
    </div>
    <div className="col-span-4 md:col-span-7 lg:col-span-10 ">
    <Outlet />
    </div>
    </div>



  </section>
}

export default Settings
