import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import classes from "../styles/home.module.css";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}

      <div className={`${classes["hero_area"]}`}>
        <section
          className={`${classes["shop_section"]} ${classes["layout_padding"]}`}
        >
          <div className={`${classes["container"]}`}>
            <div
              className={`${classes["heading_container"]} ${classes["heading_center"]}`}
            >
              <h2>Latest Products</h2>
            </div>
            <div className={`${classes["main_div"]}`}>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <>
                  {products.map((product) => (
                    <div key={product._id} className={`${classes["row"]}`}>
                      <Product product={product} />
                    </div>
                  ))}

                  <Paginate
                    pages={pages}
                    page={page}
                    keyword={keyword ? keyword : ""}
                  />
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomeScreen;
