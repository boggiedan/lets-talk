import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classes from "./EmbeddedLinkList.module.scss";

const EmbeddedLinkList = ({ links, component }) => {
  const embeddedContainerEl = useRef(null);

  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  useEffect(() => {
    setWidth(embeddedContainerEl.clientWidth);
    setHeight(embeddedContainerEl.clientHeight);
  }, [embeddedContainerEl.clientWidth, embeddedContainerEl.clientHeight]);

  const renderEmbeddedLink = (link, index) => {
    const EmbeddedLink = component;

    return (
      <EmbeddedLink key={index} link={link} width={width} height={height} />
    );
  };

  return (
    <div className={classes.container}>{links.map(renderEmbeddedLink)}</div>
  );
};

EmbeddedLinkList.propTypes = {
  links: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,

  component: PropTypes.func.isRequired
};

export default EmbeddedLinkList;
