import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/swiper-bundle.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import MyProfileScreen from "./screens/MyProfileScreen";
import MyOrderList from "./screens/MyOrderList";
import ChangePassword from "./screens/ChangePassword";
import NewOrderListScreen from "./screens/NewOrderListScreen";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
import ChangeForgetPassword from "./screens/ChangeForgetPassword";
const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="">
          <>
            <Route path="/login" component={LoginScreen} />
            <Route path="/admin/userlist" component={UserListScreen} />
            <Route
              path="/admin/productlist"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductListScreen}
              exact
            />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route
              path="/forgetPassword"
              component={ForgetPasswordScreen}
              exact
            />
            <Route
              path="/forgetPassword/reset/:authkey/:userid"
              component={ChangeForgetPassword}
              exact
            />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/search/:keyword" component={HomeScreen} exact />
            <Route path="/page/:pageNumber" component={HomeScreen} exact />
            <Route path="/myprofile" component={MyProfileScreen} />
            <Route path="/myorder" component={MyOrderList} />
            <Route path="/ship" component={NewOrderListScreen} />
            <Route path="/changepassword" component={ChangePassword} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
              exact
            />
            <Route path="/" component={HomeScreen} exact />
          </>
        </main>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
