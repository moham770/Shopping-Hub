import { createContext, useState } from "react";

export const ProductContext = createContext();


export default function ProductContextProvider({ children }) {

    const [searchQuery, setSearchQuery] = useState("");


    return    <ProductContext.Provider value={{searchQuery, setSearchQuery}}>
 
        {children}
        </ProductContext.Provider>
  
  
}
