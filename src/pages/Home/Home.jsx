import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AppBar from "../../components/AppBar/AppBar"

import { Outlet } from 'react-router-dom';

const Home = () => {
  return <section>
    <AppBar />
   <NavigationBar/>
   <div className="container">
    <Outlet/>
   </div>
 



   
  </section>
}

export default Home
