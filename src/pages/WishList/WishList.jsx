import { FavContext } from "../../context/WishlistContext";
import { useContext, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import { FaStar } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import { TiShoppingCart } from "react-icons/ti";
import { CartContext } from "../../context/CartContext";
import { MdDeleteSweep } from "react-icons/md";

import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet";

const WishList = () => {
  const { displayWishList, deleteWishList } = useContext(FavContext);
  const { addProductToCart, getCartInfo } = useContext(CartContext);
  const btnBuy = useRef();
  const { data, isLoading } = useQuery("displayWishList", displayWishList);

  const mutation = useMutation((id) => addProductToCart(id));

  const { data: datacart } = useQuery("getCartInfo", getCartInfo);
  const mutationDelete = useMutation((id) => deleteWishList(id));

  const loads = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section className="py-[5px]">
      <Helmet>
        <title>WishList</title>
      </Helmet>
      <h2 className="text-blueColor font-semibold text-[25px] my-5">
        Wish list content
      </h2>

      {isLoading ? (
        <>
          <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {loads.map((load) => {
              return (
                <div key={load}>
                  <Skeleton className="h-[200px]" />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <div className="flex justify-between">
                    <Skeleton width={100} />
                    <Skeleton width={100} />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          {data.data.length > 0 ? (
            <>
              {data && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {data.data.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="border border-greyColor shadow-xl p-1 rounded-[5px]  hover:scale-110 transition-all duration-200">
                        <img src={item.imageCover} alt="" />
                        <div className="bg-gray-200 p-2 my-1">
                          <h2 className="font-bold my-2 text-blueColor text-center">
                            {item.title.split(" ").slice(0, 2).join(" ")}
                          </h2>
                          <h4 className="text-yellow-800">
                            {item.category.name}
                          </h4>
                          <div className="flex justify-between">
                            <h3>Price:{item.price} EGP</h3>
                            <h4 className="flex items-center">
                              {" "}
                              <FaStar className="text-yellowColor" />{" "}
                              {item.ratingsAverage}
                            </h4>
                          </div>
                          <div className="flex justify-between items-center mt-1 flex-wrap gap-1">
                            <Button
                              ref={btnBuy}
                              disabled={
                                datacart &&
                                datacart.data.products.some(
                                  (prod) => prod.product.id === item.id
                                )
                              }
                              onClick={() => {
                                mutation.mutate(item.id);
                              }}
                              size="sm"
                              className={`bg-blueColor  border-none    flex items-center gap-2 sm:text-[12px] md:text-[15px] }`}>
                              {mutation.isLoading ? (
                                <i className="fas fa-spinner fa-spin text-[20px]"></i>
                              ) : (
                                "Buy"
                              )}{" "}
                              <TiShoppingCart />
                            </Button>
                            <Button
                              onClick={() => {
                                mutationDelete.mutate(item.id);
                              }}
                              className="flex items-center gap-2 bg-red-500 border-none  sm:text-[12px] md:text-[15px] "
                              size="sm">
                              Delete{" "}
                              {mutationDelete.isLoading ? (
                                <i className="fas fa-spinner fa-spin text-[18px]"></i>
                              ) : (
                                <MdDeleteSweep className="text-[20px] " />
                              )}{" "}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <p className="font-bold text-red-800 text-[32px] text-center">
              No Items in WishList{" "}
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default WishList;
