import React from "react";
import classes from "../styles/home.module.css";
// import ProductCarousel from "../components/ProductCarousel";
function NewHomeScreen() {
  return (
    <>
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
            <div className={`${classes["row"]}`}>
              <div className={`${classes["single"]}`}>
                <div className={`${classes["box"]}`}>
                  <a href="/">
                    <div className={`${classes["img-box"]}`}>
                      <img
                        src="https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg"
                        alt=""
                      />
                    </div>
                    <div className={`${classes["detail-box"]}`}>
                      <h4>
                        Rating <i className="far fa-star"></i>{" "}
                        <i className="far fa-star"></i>{" "}
                        <i className="far fa-star"></i>{" "}
                        <i className="far fa-star"></i>{" "}
                        <i className="far fa-star"></i> 1Review
                      </h4>
                      <h6>
                        Price:
                        <span>$300</span>
                      </h6>
                    </div>
                    <div className={`${classes["new"]}`}>
                      <span>Featured</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className={`${classes["btn-box"]}`}>
              <a href="/">View All</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default NewHomeScreen;
