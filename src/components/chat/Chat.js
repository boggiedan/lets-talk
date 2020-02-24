import React, { useEffect, useContext } from "react";
import classes from "./Chat.module.scss";
import Input from "./input/Input";
import { useSelector, useDispatch } from "react-redux";
import { getMessages, updateUserPosition } from "../common/actions";
import MessageList from "./messagelist/MessageList";
import { HOME_ROUTE_PATH } from "../../config/routes";
import { getThemedClass } from "../../theme/themeUtils";
import { UserContext } from "../common/usercontext/UserContext";

const Chat = () => {
  const user = useContext(UserContext);
  const messages = useSelector(state => state.chat.messages.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages());
    dispatch(updateUserPosition(HOME_ROUTE_PATH));
  }, []);

  const shouldRenderMessageList = () => {
    return !!messages && messages.length > 0;
  };

  return (
    <div
      className={getThemedClass(
        classes,
        "container",
        user.settings.interfaceColor
      )}
    >
      {shouldRenderMessageList() && <MessageList messages={messages} />}
      <Input />
    </div>
  );
};

Chat.propTypes = {};

export default Chat;
