import React from "react";
import { Link, Route } from "react-router-dom";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userAction";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import classes from "../styles/header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className={`${classes["main_container"]}`}>
      <Navbar expand="lg" className={`${classes["nav_container"]}`}>
        <Container fluid>
          <Link to="/">
            <Navbar.Brand
              className={`${classes["head_text"]}`}
              style={{ color: "white" }}
            >
              AngelShop
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {/* <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </Nav>
            <Nav>
              {userInfo ? (
                <>
                  <Link to="/cart" className={`${classes["text_cart"]}`}>
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Link>

                  <Link
                    to="/myprofile"
                    className={`${classes["text_profile"]}`}
                  >
                    <img
                      src={userInfo?.image}
                      alt=" "
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginRight: "4px",
                      }}
                    />
                    {/* <i
                      className="fas fa-solid fa-user"
                      style={{ marginRight: "4px" }}
                    ></i> */}
                    {userInfo.name}
                  </Link>

                  <Button
                    onClick={logoutHandler}
                    variant="outline-success"
                    className={`${classes["btn"]} ${classes["btn-primary"]}`}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button
                    type="button"
                    className={`${classes["btn"]} ${classes["btn-primary"]}`}
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
