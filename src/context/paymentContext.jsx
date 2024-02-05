import axios from "axios";
import { createContext, useState} from "react";
import { baseUrl } from "../utils/api";

export const Payment = createContext()


function PaymentProvider({children}){
    const [open,setOpen] = useState(false)










    return <Payment.Provider value={{open,setOpen}}>
    {children}
    </Payment.Provider>
}

export default PaymentProvider