import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Register from './pages/Register/Register.jsx'
import Login from './pages/Login/Login';
import { QueryClient, QueryClientProvider } from 'react-query'
import UserContextProvider from './context/UserContext.jsx'
import { ThemeProvider } from '@material-tailwind/react'
import Home from './pages/Home/Home.jsx'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx'
import Cart from './pages/Cart/Cart.jsx'
import WishList from './pages/WishList/WishList.jsx'
import HomePage from './components/HomePage/HomePage.jsx'

import CartContextProvider from './context/CartContext.jsx'
import FavContextProvider from './context/WishlistContext.jsx'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword.jsx'
import VerifyResetCode from './pages/VerifyResetCode/VerifyResetCode.jsx'
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx'
import Settings from './pages/Settings/Settings';
import ChangePassword from './components/ChangePassword/ChangePassword.jsx'
import ChangeData from './components/ChangeData/ChangeData.jsx'
import PaymentProvider from './context/paymentContext.jsx'
import OnlinePayment from './pages/DetailsUer/DetailsUser.jsx'
import Orders from './pages/Orders/Orders';
import ProductContextProvider from './context/ProductsContext.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound/NotFound';
import Category from './pages/Category/Category.jsx'
import Brands from './pages/Brands/Brands.jsx'




const router = createBrowserRouter([
  {path:'',element:<App/>,children:[
    {path:"/register",element:<Register/>},
    {path:"/login",element:<Login/>},
    {path:"/forgetpassword",element:<ForgetPassword/>},
    {path:"/VerifyResetCode",element:<VerifyResetCode/>},
    {path:"/resetPassword",element:<ResetPassword/>},
    {path:'',element:<ProtectedRoute><Home/></ProtectedRoute>,children:[
      {index:true,element:<ProtectedRoute><HomePage/></ProtectedRoute>},
      {path:'/cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'/allorders',element:<ProtectedRoute><Orders/></ProtectedRoute>},
      {path:'/wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
      {path:'/cart/detailsUser',element:<ProtectedRoute><OnlinePayment/></ProtectedRoute>},
      {path:'/brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'/category',element:<ProtectedRoute><Category/></ProtectedRoute>},
      {path:'*',element:<ProtectedRoute><NotFound/></ProtectedRoute>},
      {path:'/settings',element:<ProtectedRoute><Settings/></ProtectedRoute>,children:[
        {index:true,element:<ChangePassword/>},
        {path:'/settings/changePassword',element:<ChangePassword/>},
        {path:'/settings/changeData',element:<ChangeData/>},
      ]},
    ]}
  ]}
])



const queryClient = new  QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
        
    <QueryClientProvider  client={queryClient}>
      <UserContextProvider>
        <ProductContextProvider>
      <PaymentProvider >
      <CartContextProvider>
        <FavContextProvider >   
        <ThemeProvider>
    <RouterProvider router={router}/>
        {/* <Toaster /> */}
        <ToastContainer />
        </ThemeProvider>
      </FavContextProvider>
      </CartContextProvider>
      </PaymentProvider>
      </ProductContextProvider>

      </UserContextProvider>
    </QueryClientProvider>
)
