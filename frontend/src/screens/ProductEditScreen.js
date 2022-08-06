import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstant";
import classes from "../styles/productEdit.module.css";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

function ProductEditScreen({ match, history }) {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };
  useEffect(() => {
    if (error) {
      toast.error("Unable of fetch product details");
    }
  }, [error]);

  useEffect(() => {
    if (errorUpdate) {
      toast.error("Data is not updated");
    }
  }, [errorUpdate]);
  return (
    <>
      <div className={`${classes["main_container"]}`}>
        <Meta title={product?.name} />
        {loadingUpdate && <Loader />}
        {loading ? (
          <Loader />
        ) : (
          <div className={`${classes["review_container"]}`}>
            <div className={`${classes["content"]}`}>
              <h2 className={`${classes["review_header"]}`}>Edit Product</h2>
              <div className={`${classes["user-details"]}`}>
                <Form onSubmit={submitHandler}>
                  <Form.Group
                    className={`${classes["input-box"]}`}
                    controlId="name"
                  >
                    <span className={`${classes["details"]}`}>Name</span>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className={`${classes["input-box"]}`}
                    controlId="price"
                  >
                    <span className={`${classes["details"]}`}>Price</span>
                    <input
                      type="number"
                      placeholder="Enter Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group
                    className={`${classes["input-box"]}`}
                    controlId="image"
                  >
                    <span className={`${classes["details"]}`}>Image</span>
                    <input
                      type="text"
                      placeholder="Enter Imageurl"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <p className={`${classes["para_mid"]}`}>Or</p>
                    <Form.File
                      id="image-file"
                      className={`${classes["custom-file-upload"]}`}
                      // label="Choose File"
                      custom
                      onChange={uploadFileHandler}
                    ></Form.File>
                    {uploading && <Loader />}
                  </Form.Group>

                  <Form.Group
                    className={`${classes["input-box"]}`}
                    controlId="brand"
                  >
                    <span className={`${classes["details"]}`}>Brand</span>
                    <input
                      type="text"
                      placeholder="Enter brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group
                    className={`${classes["input-box"]}`}
                    controlId="countInStock"
                  >
                    <span className={`${classes["details"]}`}>
                      Count In Stock
                    </span>
                    <input
                      type="number"
                      placeholder="Enter countInStock"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group
                    className={`${classes["input-box"]}`}
                    controlId="category"
                  >
                    <span className={`${classes["details"]}`}>Category</span>
                    <input
                      type="text"
                      placeholder="Enter category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group
                    className={`${classes["input-box"]}`}
                    controlId="description"
                  >
                    <span className={`${classes["details"]}`}>Description</span>
                    <input
                      type="text"
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>

                  <button className={`${classes["cart-btn"]}`} type="submit">
                    Update
                  </button>
                </Form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductEditScreen;
