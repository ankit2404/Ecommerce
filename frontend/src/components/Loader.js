import React from "react";
const Loader = () => {
  return (
    <>
      <lottie-player
        src="https://assets3.lottiefiles.com/packages/lf20_jyrxvzzj.json"
        background="transparent"
        speed="1"
        style={{
          width: "200px",
          height: "200px",
          margin: "auto",
          display: "block",
          marginTop: "10%",
        }}
        loop
        autoplay
      ></lottie-player>
    </>
  );
};

export default Loader;
