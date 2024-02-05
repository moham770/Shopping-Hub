import { IconButton } from "@material-tailwind/react";
import { TiShoppingCart } from "react-icons/ti";
import ProductDetails from "./Products/ProductDetails";
import { useContext, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { CartContext } from "./../context/CartContext";
import { FavContext } from './../context/WishlistContext';

const ProductItem = ({ ProductsData }) => {
  const { imageCover, title, category, price, id } = ProductsData;
  const [detailsModal, setDetailsModal] = useState(false);
  const [productid, setproductid] = useState(null);
  const cartButton = useRef()
  const favButton = useRef()
  const {getCartInfo} = useContext(CartContext)
  const {displayWishList,addProductToWishList} = useContext(FavContext)


  function openModal() {
    setDetailsModal(true);
    setproductid(id);
  }
  function handleCartButtonClick(e) {
    e.stopPropagation();
  }

  const { setCartNumber,addProductToCart} = useContext(CartContext);
 

  const mutation = useMutation( (id) => addProductToCart(id) , {
    onSuccess: (data) => {
      cartButton.current.classList.add('bg-green-600','text-white','border-none')
      setCartNumber(data.numOfCartItems)
    },
    
  });


  const mutationFav = useMutation((id)=> addProductToWishList(id),{
    onSuccess:()=>{
      favButton.current.classList.add('text-white','bg-red-500','border-none','disabled')
  

    }
  })


  const {data:datacart }=  useQuery("getCartInfo", getCartInfo);
  const isInCart = datacart && datacart.data.products.some( (prod)=> prod.product.id === id)
  const inCartClass = isInCart ? `bg-green-500 text-white border-none` : null;
  
  
const {data:dataFav }=  useQuery("displayWishList", displayWishList);
const isInFavorite = dataFav && dataFav.data.some((fav) => fav.id === id);
const inFavourite = isInFavorite ? `text-white bg-red-500 border-none` : null;


  return (
    <>
      <article
        onClick={() => {
          openModal();
        }}
        className="relative  bg-gray-200  p-2 card overflow-hidden rounded-md hover:scale-[1.1] hover:shadow-2xl  cursor-pointer transition-all duration-200  hover:bg-gray-300 hover:border-[1px] hover:border-yellowColor">
        <div className="overflow-hidden relative">
          <img
            className="w-full transition-all duration-200"
            src={imageCover}
            alt={title}
          />
          <div
            onClick={(e)=>{
              handleCartButtonClick(e)
              mutation.mutate(id)
            }
              
            }
            className="absolute bottom-3 right-2 ">
            <IconButton  ref={cartButton} variant="outlined" className={`text-[18px] ${inCartClass}`}>
             {mutation.isLoading ? <i className={`fa-solid fa-spinner fa-spin mx-2 `}></i> : <TiShoppingCart   />}  
            </IconButton>
          </div>
        </div>
        <h2 className="text-center font-bold text-blueColor pt-2">
          {title.split(" ").slice(0, 2).join(" ")}
        </h2>
        <div className="flex justify-between ">
          <h4 className="text-greyColor">{category.name}</h4>
          <h4 className="text-yellowColor">{price + ` EGP`}</h4>
        </div>
        <div
          onClick={(e) => {
            handleCartButtonClick(e);
            mutationFav.mutate(id)
          }}
          className="absolute right-5 top-5">
          <IconButton ref={favButton} className={inFavourite }  variant="outlined">
           {mutationFav.isLoading ?<i className="fas fa-spinner fa-spin " /> :<i className="fas fa-heart " />}  
          </IconButton>
        </div>
      </article>

      {detailsModal ? (
        <ProductDetails
          setDetailsModal={setDetailsModal}
          productid={productid}
        />
      ) : null}
    </>
  );
};

export default ProductItem;
