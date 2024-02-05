import axios from "axios"
import { useQuery } from "react-query"
import { baseUrl } from '../../utils/api';

const BrandsSlider = () => {
    

async function getBrandsSlider(){
    try {
        const {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/subcategories`)
        return data.data
        
    } catch (error) {
        console.log('getBrandsSlider =>',error)
        
    }
}

const {data}= useQuery('getBrandsSlider',getBrandsSlider)

console.log(data)

  return (
    <div>
      Brands
    </div>
  )
}

export default BrandsSlider
