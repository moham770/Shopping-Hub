import { useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Outlet } from "react-router-dom";
import { CartContext } from "./context/CartContext";

import { userContext } from "./context/UserContext";
import { FavContext } from "./context/WishlistContext";
import UpToStart from "./components/UpToStart/UpToStart";
import { ProductContext } from "./context/ProductsContext";
import Footer from "./components/Footer/Footer";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import AppBar from "./components/AppBar/AppBar";

const App = () => {
  const { getCartInfo } = useContext(CartContext);
  const { refetch } = useQuery("getCartInfo", getCartInfo);
  const { displayWishList } = useContext(FavContext);
  const data = useQuery("displayWishList", displayWishList);

  const { token } = useContext(userContext);
  
  useEffect(() => {
    (async () => {
      await getCartInfo();
      await refetch();
      await displayWishList();
      await data.refetch();
    })();
  }, [token]);

  return (
    <article>
        <Outlet />

        <UpToStart />

      <Footer/>
    </article>
  );
};

export default App;
