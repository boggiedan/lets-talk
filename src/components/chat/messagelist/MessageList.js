import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Message from "./message/Message";
import classes from "./MessageList.module.scss";

const MessageList = ({ messages }) => {
  const messagesBottomEl = useRef(null);

  useEffect(() => scrollToBottom(), [messages]);

  const scrollToBottom = () => {
    messagesBottomEl.current.scrollIntoView({
      block: "end",
      inline: "nearest",
      behavior: "smooth"
    });
  };

  const renderMessage = item => {
    const { id, value, username, userId, datetime } = item;

    return (
      <Message
        key={id}
        username={username}
        userId={userId}
        message={value}
        datetime={datetime}
      />
    );
  };

  return (
    <section className={classes.container}>
      {messages.map(renderMessage)}
      <span ref={messagesBottomEl} />
    </section>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,

      value: PropTypes.string.isRequired,

      username: PropTypes.string.isRequired,

      datetime: PropTypes.string.isRequired,

      userId: PropTypes.string.isRequired
    })
  ).isRequired
};

export default MessageList;
