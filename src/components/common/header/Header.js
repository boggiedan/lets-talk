import React from "react";
import PropTypes from "prop-types";
import classes from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SETTINGS_ROUTE_PATH, HOME_ROUTE_PATH } from "../../../config/routes";
import { useTranslation } from "react-i18next";

const Header = ({ username }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const homePageClickHandler = () => history.push(HOME_ROUTE_PATH);

  const userSettingsClickHandler = () => history.push(SETTINGS_ROUTE_PATH);

  return (
    <header className={classes.container}>
      <Typography className={classes.logo} onClick={homePageClickHandler}>
        LetsTalk
      </Typography>
      <div className={classes.userWrapper} onClick={userSettingsClickHandler}>
        <Typography className={classes.username}>
          {t("Welcome")} {username}
        </Typography>
        <FontAwesomeIcon className={classes.icon} icon={faUserCog} />
      </div>
    </header>
  );
};

Header.propTypes = {
  username: PropTypes.string.isRequired
};

export default Header;
