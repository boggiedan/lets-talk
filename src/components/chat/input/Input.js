import React, { useState, useRef, useEffect, useContext } from "react";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../common/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import classes from "./Input.module.scss";
import { UserContext } from "../../common/usercontext/UserContext";
import { useTranslation } from "react-i18next";
import { Smile } from "react-feather";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { getThemedClass } from "../../../theme/themeUtils";

const ENTER = 13;

const Input = () => {
  const { t } = useTranslation();

  const user = useContext(UserContext);
  const { sendMessageHotkey, interfaceColor } = user.settings;

  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const dispatch = useDispatch();
  const inputEl = useRef(null);

  // Adding message to useEffect is necessary otherwise submit
  // func won't have access to message state var
  useEffect(() => {
    if (sendMessageHotkey) {
      window.addEventListener("keydown", keyDownHandler);
    }

    return () => {
      if (sendMessageHotkey) {
        window.removeEventListener("keydown", keyDownHandler);
      }
    };
  }, [message, sendMessageHotkey]);

  const submit = () => {
    if (message && message.trim()) {
      dispatch(sendMessage(user.username, user.id, message));
      setMessage("");
      inputEl.current.focus();
    }
  };

  const keyDownHandler = event => {
    const { keyCode, ctrlKey } = event;

    if (ctrlKey && keyCode === ENTER) {
      submit();
    }
  };

  const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);

  const emojiSelectHandler = emoji => {
    setMessage(message + emoji.native);
    toggleEmojiPicker();
  };

  const inputChangeHandler = event => setMessage(event.target.value);

  const submitHandler = () => submit();

  return (
    <div className={getThemedClass(classes, "container", interfaceColor)}>
      <div className={classes.wrapper}>
        {showEmojiPicker && (
          <Picker
            style={{ position: "absolute", bottom: 70 }}
            set="google"
            onSelect={emojiSelectHandler}
          />
        )}
        <button
          className={getThemedClass(classes, "toggleEmoji", interfaceColor)}
          type="button"
          onClick={toggleEmojiPicker}
        >
          <Smile />
        </button>
        <TextField
          inputRef={inputEl}
          placeholder={t("Enter your message")}
          variant="outlined"
          fullWidth
          value={message}
          onChange={inputChangeHandler}
          InputLabelProps={{
            shrink: true,
            className: getThemedClass(classes, "input", interfaceColor)
          }}
          InputProps={{
            className: getThemedClass(classes, "input", interfaceColor),
            classes: {
              notchedOutline: getThemedClass(
                classes,
                "inputFocused",
                interfaceColor
              )
            }
          }}
        />
        <FontAwesomeIcon
          className={getThemedClass(classes, "sendIcon", interfaceColor)}
          onClick={submitHandler}
          icon={faPaperPlane}
        />
      </div>
    </div>
  );
};

export default Input;
