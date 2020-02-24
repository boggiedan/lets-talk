import React from "react";
import PropTypes from "prop-types";
import classes from "./EmbeddedImg.module.scss";

const EmbeddedImg = ({ link }) => {
  const redirectToImgClickHandler = () => {
    window.open(link, "__banck");
  };

  return (
    <img
      className={classes.img}
      src={link}
      onClick={redirectToImgClickHandler}
      alt="Embedded posted link"
    />
  );
};

EmbeddedImg.propTypes = {
  link: PropTypes.string.isRequired
};

export default EmbeddedImg;
