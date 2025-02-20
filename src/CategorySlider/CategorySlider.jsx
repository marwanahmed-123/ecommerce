import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading/loading";

export default function CategorySlider() {
  const getCategories = () =>
    axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  const { isLoading, error, isError, data, isFetching } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
    staleTime: 5000 * 1000,
  });
  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <Slider {...settings}>
        {isLoading ? (
          <Loading />
        ) : (
          data.data.data.map((c) => (
            <div key={c._id}>
              <img className="w-full h-52 object-cover" src={c.image} alt="" />
              <h2 className="text-center font-normal text-lg">{c.name}</h2>
            </div>
          ))
        )}
      </Slider>
    </>
  );
}
