import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../components/Paginate";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstant";
import classes from "../styles/productList.module.css";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

function ProductListScreen({ history, match }) {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  useEffect(() => {
    if (errorDelete) {
      toast.error("Unable to delete product");
    }
  }, [errorDelete]);

  useEffect(() => {
    if (errorCreate) {
      toast.error("Product is not added");
    }
  }, [errorCreate]);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);

  return (
    <>
      {loadingDelete && <Loader />}
      {loadingCreate && <Loader />}
      {loading ? (
        <Loader />
      ) : (
        <div className={`${classes["myordercontainer"]}`}>
          <Meta title="All Products" />
          <article className={`${classes["leaderboard"]}`}>
            <header>
              <h1 className={`${classes["leaderboard__title__new"]}`}>
                <span
                  className={`${classes["leaderboard__title--top"]}`}
                  style={{ color: "white" }}
                >
                  AngelShop
                </span>
                <span
                  className={`${classes["leaderboard__title--bottom"]}`}
                  style={{ color: "white" }}
                >
                  All Products
                </span>
              </h1>
              <button
                className={`${classes["btn"]}  ${classes["btn-primary"]} ${classes["leaderboard__title"]} ${classes["create__button"]}`}
                onClick={createProductHandler}
              >
                <i className="fas fa-plus"></i> Create Product
              </button>
            </header>

            <div className={`${classes["leaderboard__profiles"]} `}>
              <article
                className={`${classes["leaderboard__profile"]}  ${classes["div-flex"]} ${classes["front"]}`}
              >
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__name"]}`}
                  style={{ width: "40%" }}
                >
                  Product Name
                </span>
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__email"]}`}
                  style={{ width: "13%" }}
                >
                  Price
                </span>
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__admin"]}`}
                  style={{ width: "20%" }}
                >
                  Brand
                </span>
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__button_edit"]}`}
                  style={{ paddingLeft: "20px" }}
                >
                  Edit
                </span>
                <span
                  className={`${classes["leaderboard__name"]} ${classes["user__button"]}`}
                  style={{ paddingLeft: "8%" }}
                >
                  Delete
                </span>
              </article>
              {products.length === 0 ? "No Products" : ""}
              {products.map((product) => (
                <article
                  key={product._id}
                  className={`${classes["leaderboard__profile"]} ${classes["for-user"]} `}
                >
                  <span
                    className={`${classes["leaderboard__name"]} ${classes["user__name"]}`}
                  >
                    {product.name}
                  </span>
                  <span
                    className={`${classes["leaderboard__name"]} ${classes["user__email"]}`}
                  >
                    ${product.price}
                  </span>
                  <span
                    className={`${classes["leaderboard__name"]} ${classes["user__admin"]}`}
                  >
                    {product.brand}
                  </span>
                  <div className={`${classes["user__button_edit"]}`}>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button
                        className={`${classes["btn"]}  ${classes["btn-primary"]}`}
                        type="submit"
                      >
                        Edit
                      </button>
                    </Link>
                  </div>
                  <div className={`${classes["user__button"]}`}>
                    <button
                      className={`${classes["btn"]}  ${classes["btn-primary"]}`}
                      type="submit"
                      onClick={() => deleteHandler(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </div>
      )}
      <Paginate pages={pages} page={page} isAdmin={true} />
    </>
  );
}

export default ProductListScreen;
