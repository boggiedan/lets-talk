import React from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";

const EmbeddedYoutube = ({ link, height, width }) => {
  const opts = {
    height: height,
    width: width
  };

  return <YouTube videoId={link} opts={opts} />;
};

EmbeddedYoutube.propTypes = {
  link: PropTypes.string.isRequired
};

export default EmbeddedYoutube;
