import { useQuery } from 'react-query';
import PaginationComp from '../../components/PaginationComp/PaginationComp'
import CategorySlider from '../CategorySlider/CategorySlider'
import Products from '../Products/Products'
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const HomePage = () => {

  return <main >
  
  <CategorySlider/> 
    <Products /> 

  
  
  </main>
}

export default HomePage
