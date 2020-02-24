import React, { useState, useContext, useEffect } from "react";
import classes from "./Settings.module.scss";
import {
  TextField,
  FormControl,
  FormLabel,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormGroup,
  Switch,
  MenuItem,
  Select,
  InputLabel,
  Button,
  Typography,
  OutlinedInput,
  Badge
} from "@material-ui/core";
import { UserContext } from "../common/usercontext/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { updateUserSettings, updateUserPosition } from "../common/actions";
import { useTranslation } from "react-i18next";
import { defaultSettings } from "../common/defaultsettings/defaultSettings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { HOME_ROUTE_PATH, SETTINGS_ROUTE_PATH } from "../../config/routes";
import { getThemedClass } from "../../theme/themeUtils";

const Settings = () => {
  const unreadMessages = useSelector(
    state => state.chat.messages.unreadMessages
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const user = useContext(UserContext);
  const theme = user.settings.interfaceColor;
  const { t, i18n } = useTranslation();

  const [usernameInputTimout, setUsernameInputTimeout] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [sendMessageHotkey, setSendMessageHotkey] = useState(
    user.settings.sendMessageHotkey
  );

  useEffect(() => {
    dispatch(updateUserPosition(SETTINGS_ROUTE_PATH));
  }, []);

  // Update the settings with the new username only when the user has
  // finished to write
  useEffect(() => {
    usernameInputTimout && clearTimeout(usernameInputTimout);
    setUsernameInputTimeout(
      setTimeout(() => {
        if (username) {
          dispatch(
            updateUserSettings({
              ...user,
              username: username
            })
          );
        }
      }, 700)
    );
  }, [username]);

  const usernameChangeHandler = event => {
    setUsername(event.target.value);
  };

  const interfaceColorChangeHandler = event => {
    dispatch(
      updateUserSettings({
        ...user,
        settings: {
          ...user.settings,
          interfaceColor: event.target.value
        }
      })
    );
  };

  const clockDisplayChangeHandler = event => {
    dispatch(
      updateUserSettings({
        ...user,
        settings: {
          ...user.settings,
          clockDisplay: JSON.parse(event.target.value)
        }
      })
    );
  };

  const sendMessageHotkeyChangeHandler = () => {
    setSendMessageHotkey(!sendMessageHotkey);
    dispatch(
      updateUserSettings({
        ...user,
        settings: {
          ...user.settings,
          sendMessageHotkey: !sendMessageHotkey
        }
      })
    );
  };

  const languageChangeHandler = event => {
    const { value } = event.target;

    i18n.changeLanguage(value);
    dispatch(
      updateUserSettings({
        ...user,
        settings: {
          ...user.settings,
          language: value
        }
      })
    );
  };

  const resetValuesClickHandler = () => {
    dispatch(
      updateUserSettings({
        ...defaultSettings,
        username,
        id: user.id
      })
    );
    setSendMessageHotkey(defaultSettings.settings.sendMessageHotkey);
    i18n.changeLanguage(defaultSettings.settings.language);
  };

  const goBackClickHandler = () => {
    history.push(HOME_ROUTE_PATH);
  };

  return (
    <section className={classes.container}>
      <div className={getThemedClass(classes, "wrapper", theme)}>
        <Typography
          className={getThemedClass(classes, "title", theme)}
          variant="h1"
        >
          {t("Settings")}
        </Typography>
        <div className={classes.settingWrapper}>
          <Badge
            classes={{
              badge: getThemedClass(classes, "unreadMessagesBadge", theme)
            }}
            badgeContent={unreadMessages}
          >
            <Typography
              className={getThemedClass(classes, "goBackButton", theme)}
              onClick={goBackClickHandler}
            >
              <FontAwesomeIcon icon={faChevronLeft} /> {t("Go to chat")}
            </Typography>
          </Badge>
        </div>
        <div className={getThemedClass(classes, "settingWrapper", theme)}>
          <TextField
            label={t("User name")}
            variant="outlined"
            placeholder="Enter your new user name"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
              className: getThemedClass(classes, "input", theme)
            }}
            InputProps={{
              className: getThemedClass(classes, "input", theme),
              classes: {
                notchedOutline: getThemedClass(classes, "inputFocused", theme)
              }
            }}
            value={username}
            onChange={usernameChangeHandler}
          />
        </div>
        <div className={classes.settingWrapper}>
          <FormControl component="fieldset">
            <FormLabel
              className={getThemedClass(classes, "highlight", theme)}
              component="legend"
            >
              {t("Interface color")}
            </FormLabel>
            <RadioGroup
              value={user.settings.interfaceColor}
              onChange={interfaceColorChangeHandler}
            >
              <FormControlLabel
                className={getThemedClass(classes, "highlight", theme)}
                value="light"
                control={
                  <Radio
                    classes={{
                      checked: getThemedClass(classes, "highlight", theme)
                    }}
                  />
                }
                label={t("Light")}
                labelPlacement="end"
              />
              <FormControlLabel
                className={getThemedClass(classes, "highlight", theme)}
                value="dark"
                control={
                  <Radio
                    classes={{
                      checked: getThemedClass(classes, "highlight", theme)
                    }}
                  />
                }
                label={t("Dark")}
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel
              className={getThemedClass(classes, "highlight", theme)}
              component="legend"
            >
              {t("Clock display")}
            </FormLabel>
            <RadioGroup
              value={user.settings.clockDisplay}
              onChange={clockDisplayChangeHandler}
            >
              <FormControlLabel
                className={getThemedClass(classes, "highlight", theme)}
                value={12}
                control={
                  <Radio
                    classes={{
                      checked: getThemedClass(classes, "highlight", theme)
                    }}
                  />
                }
                label={t("12 Hours")}
                labelPlacement="end"
              />
              <FormControlLabel
                className={getThemedClass(classes, "highlight", theme)}
                value={24}
                control={
                  <Radio
                    classes={{
                      checked: getThemedClass(classes, "highlight", theme)
                    }}
                  />
                }
                label={t("24 Hours")}
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={classes.settingWrapper}>
          <FormGroup row>
            <FormControlLabel
              className={getThemedClass(classes, "highlight", theme)}
              label={t("Send messages on CTRL+ENTER")}
              labelPlacement="start"
              control={
                <Switch
                  classes={{
                    checked: getThemedClass(classes, "highlight", theme)
                  }}
                  checked={sendMessageHotkey}
                  onChange={sendMessageHotkeyChangeHandler}
                />
              }
            />
          </FormGroup>
        </div>
        <div className={classes.settingWrapper}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel
              className={getThemedClass(classes, "inputLabel", theme)}
              id="language-selector"
              shrink={true}
              variant="outlined"
            >
              {t("Language")}
            </InputLabel>
            <Select
              classes={{
                icon: getThemedClass(classes, "highlight", theme)
              }}
              labelId="language-selector"
              input={
                <OutlinedInput
                  className={getThemedClass(classes, "input", theme)}
                  classes={{
                    notchedOutline: getThemedClass(
                      classes,
                      "inputFocused",
                      theme
                    )
                  }}
                  id="language-selector"
                  labelWidth={user.settings.language === "en" ? 75 : 55}
                />
              }
              value={user.settings.language}
              onChange={languageChangeHandler}
            >
              <MenuItem value="en">{t("English")}</MenuItem>
              <MenuItem value="fr">{t("French")}</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button
          className={getThemedClass(classes, "resetButton", theme)}
          variant="outlined"
          onClick={resetValuesClickHandler}
        >
          {t("Reset to default")}
        </Button>
      </div>
    </section>
  );
};

export default Settings;
