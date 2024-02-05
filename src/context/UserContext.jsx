import { createContext, useState} from "react";


export const userContext = createContext()


export default function UserContextProvider({children}){

const [token,setToken] = useState(localStorage.getItem('token'))

const headers ={
    token
}

    return <userContext.Provider value={{token,setToken,headers}} >
        {children}
    </userContext.Provider>
} 