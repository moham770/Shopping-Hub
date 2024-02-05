import { Button } from "@material-tailwind/react";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { MdDeleteSweep } from "react-icons/md";
import { CartContext } from "../../context/CartContext";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

const Cart = () => {
  const { getCartInfo, clearCart, updateCount,deleteItem } = useContext(CartContext);
  const { data, isLoading,refetch } = useQuery("getCartInfo", getCartInfo);
const queryClient = useQueryClient()

  const mutation = useMutation(clearCart,{
    onSuccess: (data) => {
      console.log("Cart cleared successfully", data);
    },
    onError: (error) => {
      console.log(" useMutation(clearCart)", error);
    },
  });

  const mutationCount = useMutation((id, count) => updateCount(id, count), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });


  const mutationDeleteItem = useMutation((id)=>deleteItem(id),{
    onSuccess:(data)=>{
      console.log(data)
    },
    onError:(error)=>{
      console.log('error mutationDeleteItem', error)
    }
  })

  return (
    <section className=" py-[5px]">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <h2 className="text-blueColor font-semibold text-[25px] my-5">My Cart</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data && data.data.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start ">
              <div className="col-span-2">
                {data.data.products.map((product) => (
                  <div
                    key={product._id}
                    className="grid grid-cols-1 md:grid-cols-10 items-center gap-5 mb-3 border-blueColor px-3 py-1 border-[1.5px]">
                    <div className="col-span-2">
                      <img src={product.product.imageCover} alt="" />
                      <div className="md:text-center mb-5 mt-1">
                        <Button 
                        disabled={mutationDeleteItem.isLoading ? true :null}
                        onClick={()=>{
                          mutationDeleteItem.mutate(product.product.id)
                        }} variant="outlined" size="sm">
                          {mutationDeleteItem.isLoading ?   <i className="fas fa-spinner fa-spin text-[19px]  "></i> :     <MdDeleteSweep className="text-[20px] text-red-900" />}
                      
                        </Button>
                      </div>
                    </div>
                    <div className="col-span-8">
                      <h3 className="font-bold text-yellowColor text-[18px]">
                        {product.product.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div className="flex items-center gap-1 my-1">
                        <h6>Qty:</h6>
                        <Button
                        disabled ={mutationCount.isLoading ? true :null}
                          onClick={() => {
                            mutationCount.mutate({
                              id: product.product.id,
                              count: product.count - 1,
                            });
                          }}
                          variant="outlined"
                          size="sm">
                          {mutationCount.isLoading ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            `-`
                          )}
                        </Button>
                        <p>{product.count}</p>
                        <Button disabled ={mutationCount.isLoading ? true :null}
                          onClick={() => {
                            mutationCount.mutate({
                              id: product.product.id,
                              count: product.count + 1,
                            });
                          }}
                          variant="outlined"
                          size="sm">
                          {mutationCount.isLoading ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            `+`
                          )}
                        </Button>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-greyColor">
                          Price: {product.price} EGP
                        </p>
                        <h4 className="text-blueColor font-bold text-[18px]">
                          Sub Total: {product.price} EGP
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="h-[1px] w-full bg-greyColor bg-opacity-[0.5]"></div>
                <Button
                  onClick={() => {
                    mutation.mutate();
                  }}
                  className="flex items-center text-red-500 my-2"
                  variant="outlined">
                  {mutation.isLoading ? (
                    <i className="fas fa-spinner fa-spin mx-3 text-[20px]"></i>
                  ) : (
                    "Clear Cart "
                  )}
                  <MdDeleteSweep className="text-[20px]" />
                </Button>
              </div>

              <div className="bg-white p-3 border  ">
                <h3 className="text-[20px]">Order Summary</h3>
                <div className="h-[1px] w-full bg-greyColor bg-opacity-[0.5]"></div>
                <div className="my-5 font-semibold">
                  <p>Number Of Cart Items: {data.numOfCartItems}</p>
                  <p className="text-blueColor">
                    Total Price: {data.data.totalCartPrice} EGP
                  </p>
                </div>
                <div className="h-[1px] w-full bg-greyColor bg-opacity-[0.5]"></div>
                <Link to='/cart/detailsUser'>
                <Button className="bg-yellowColor my-2 w-full">
                  Proceed to Checkout
                </Button>
                </Link>
           
              </div>
            </div>
          ) : (
           <p className="font-bold text-red-800 text-[32px] text-center"> No Items in  Cart  </p>
          )}
        </>
      )}
    </section>
  );
};

export default Cart;
