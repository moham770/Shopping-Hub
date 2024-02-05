import axios from "axios";
import { baseUrl } from "../../utils/api";
import { useQuery  } from "react-query";
import ProductItem from "../ProductItem";
import "react-loading-skeleton/dist/skeleton.css";
import SkeltonProducts from "./SkeltonProducts";
import { useContext, useState } from "react";
import PaginationComp from "../PaginationComp/PaginationComp";
import { ProductContext } from "../../context/ProductsContext";
import { Helmet } from "react-helmet";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
const {searchQuery} = useContext(ProductContext)

  const pageSize = 10;
   async function getProducts() {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/products`);
      return data.data;
    } catch (error) {
      console.log("error Prodiucts =>", error);
      throw error;
    }
  }
  

  const { data, isLoading } = useQuery("getProduts", getProducts);



  const filteredProducts = data?.filter((product) =>
  product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );



  const totalPage = Math.ceil(data && data.length / pageSize);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };




  return (
    <>
        <Helmet>
        <title>Home</title>
      </Helmet>
      <h2 className="text-[25px] text-blueColor font-semibold mb-5 ">
        Products
      </h2>
      <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {isLoading && <SkeltonProducts />}
        {filteredProducts &&
          filteredProducts
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((product) => {
              return <ProductItem key={product.id} ProductsData={product} />;
            })}
      </article>

      <PaginationComp
        totalPage={totalPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

    </>
  );
};

export default Products;
