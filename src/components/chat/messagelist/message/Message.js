import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import classes from "./Message.module.scss";
import classNames from "class-names";
import { UserContext } from "../../../common/usercontext/UserContext";
import format from "date-fns/format";
import Linkify from "react-linkify";
import EmbededLinkList from "./embeddedlinklist/EmbeddedLinkList";
import ImgLink from "./embeddedimg/EmbeddedImg";
import EmbeddedYoutube from "./embeddedyoutube/EmbeddedYoutube";
import { getThemedClass } from "../../../../theme/themeUtils";

const matchImg = new RegExp("(http)?s?:?(//[^\"']*.(?:png|jpg|jpeg|gif))");
const matchYoutube =
  "(?:youtube\\.com\\/\\S*(?:(?:\\/e(?:mbed))?\\/|watch\\?(?:\\S*?&?v\\=))|youtu\\.be\\/)([a-zA-Z0-9_-]{6,11})";

const Message = ({ username, userId, message, datetime }) => {
  const user = useContext(UserContext);
  const theme = user.settings.interfaceColor;

  const isCurrentUser = user.id === userId;
  const clockFormat = user.settings.clockDisplay === 12 ? "hh:mm a" : "HH:MM";
  const imgLinks = message.match(matchImg);
  const youtubeLinks = message.match(matchYoutube);

  const messageContainer = classNames(classes.messageContainer, {
    [classes.messageContainerLeft]: !isCurrentUser,
    [classes.messageContainerRight]: isCurrentUser
  });

  const messageClasses = classNames(classes.message, {
    [getThemedClass(classes, "messageLeft", theme)]: !isCurrentUser,
    [getThemedClass(classes, "messageRight", theme)]: isCurrentUser
  });

  return (
    <div className={classes.container}>
      <div className={messageContainer}>
        <div className={classes.messageWrapper}>
          {!isCurrentUser && (
            <Typography
              className={getThemedClass(classes, "messageInfo", theme)}
            >
              {username} - {format(new Date(datetime), clockFormat)}
            </Typography>
          )}
          <div className={messageClasses}>
            <Linkify>
              <Typography>{message}</Typography>
            </Linkify>
            {imgLinks && (
              <EmbededLinkList
                links={imgLinks[0].split(" ")}
                component={ImgLink}
              />
            )}
            {youtubeLinks && (
              <EmbededLinkList
                links={youtubeLinks[1].split(" ")}
                component={EmbeddedYoutube}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  username: PropTypes.string.isRequired,

  userId: PropTypes.string.isRequired,

  message: PropTypes.string.isRequired,

  datetime: PropTypes.string.isRequired
};

export default Message;
