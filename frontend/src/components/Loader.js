import React from "react";
import classes from "../styles/loader.module.css";
const Loader = () => {
  return (
    <div className={classes["main_div"]}>
      <lottie-player
        src="https://assets3.lottiefiles.com/packages/lf20_jyrxvzzj.json"
        background="transparent"
        speed="1"
        className={classes["loatify_div"]}
        style={{
          width: "200px",
          height: "200px",
          display: "block",
          position: "absolute",
          top: "30%",
          left: "40%",
          zIndex: "5",
        }}
        loop
        autoplay
      ></lottie-player>
    </div>
  );
};

export default Loader;
