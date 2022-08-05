import React, { useState } from "react";
import classes from "../styles/header.module.css";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="me-2"
        style={{ height: "40px", borderRadius: "5px" }}
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-success"
        className={`${classes["btn"]} ${classes["btn-primary"]}`}
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
