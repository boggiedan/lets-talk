import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classes from "./MainContent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, updateUserSettings } from "../../common/actions";
import { UserContext } from "../usercontext/UserContext";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { HOME_ROUTE_PATH } from "../../../config/routes";

const MainContent = ({
  children,
  username,
  userSettings,
  onUpdateUserSettings
}) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const storedUserSettings = useSelector(state => state.chat.user);
  const history = useHistory();

  useEffect(() => {
    if (userSettings) {
      dispatch(updateUserSettings(userSettings));
      i18n.changeLanguage(userSettings.settings.language);
    } else {
      dispatch(registerUser(username));
    }

    history.push(HOME_ROUTE_PATH);
  }, []);

  useEffect(() => {
    const { id, username, settings } = storedUserSettings;

    if (id) {
      onUpdateUserSettings({
        id,
        username,
        settings
      });
    }
  }, [storedUserSettings]);

  return (
    <main className={classes.container}>
      {storedUserSettings.id && (
        <UserContext.Provider value={storedUserSettings}>
          {children}
        </UserContext.Provider>
      )}
    </main>
  );
};

MainContent.propTypes = {
  children: PropTypes.node.isRequired,

  username: PropTypes.string,

  userSettings: PropTypes.object,

  onUpdateUserSettings: PropTypes.func.isRequired
};

export default MainContent;
