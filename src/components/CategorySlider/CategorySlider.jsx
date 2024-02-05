import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "../../utils/api";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import Loading from "../Loading/Loading";

const CategorySlider = () => {
  async function getCategorySlider() {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/categories`);
      return data.data;
    } catch (error) {
      console.log("error getCategorySlider =>", error);
    }
  }

  const { data, isLoading } = useQuery(`getCategorySlider`, getCategorySlider);

  return (
    <>
      <h2 className="font-semibold text-[25px] text-blueColor  my-5">
        Categories
      </h2>
      {isLoading && <Loading />}
      {data && (
        <Swiper
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={7}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}

          //   onSlideChange={() => console.log('slide change')}
          //   onSwiper={(swiper) => console.log(swiper)}
        >
          {data.map((cat) => {
            return (
              <SwiperSlide key={cat._id} className="cursor-grab mb-5">
                <img
                  src={cat.image}
                  className=" w-[200px] h-[200px] object-cover object-center"
                  alt={cat.slug}
                />
                <h2 className="text-center text-blueColor font-bold">
                  {cat.name}
                </h2>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
};

export default CategorySlider;
