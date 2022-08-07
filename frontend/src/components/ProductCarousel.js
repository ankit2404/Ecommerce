import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
// import Message from "../components/Message";
import classes from "../styles/slider.module.css";
import { listTopProducts } from "../actions/productActions";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import SwiperCore, { Lazy, Autoplay, Pagination, Navigation } from "swiper";
SwiperCore.use([Lazy, Autoplay, Pagination, Navigation]);

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);

  return loading ? (
    <Loader />
  ) : (
    <div className={`${classes["main_div"]}`} style={{ marginTop: "10px" }}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        lazy={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        loop={true}
        modules={[Lazy, Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className={`${classes["content_div"]}`}>
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={`${classes["swiper_image_class"]}`}
                />
                {/* <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div> */}
              </Link>
              <div className={`${classes["content_des"]}`}>
                <Link to={`/product/${product._id}`}>
                  <h3 className={`${classes["slider_header"]}`}>
                    {product.name}
                  </h3>
                </Link>
                <p className={`${classes["slider_para"]}`}>
                  {product.description}
                </p>
                <Link to={`/product/${product._id}`}>
                  <button
                    className={`${classes["btn"]} ${classes["btn-primary"]}`}
                    type="button"
                  >
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
