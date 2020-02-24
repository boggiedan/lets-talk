import React, { useState } from "react";
import "./App.scss";
import { Provider } from "react-redux";
import MainContent from "./components/common/maincontent/MainContent";
import store from "./store/store";
import Header from "./components/common/header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RegisterDialog from "./components/registerdialog/RegisterDialog";
import { HOME_ROUTE_PATH, SETTINGS_ROUTE_PATH } from "./config/routes";
import Chat from "./components/chat/Chat";
import Settings from "./components/settings/Settings";

const STORAGE_ITEM_NAME = "lets_talk_settings";

function App() {
  const userSettings = JSON.parse(localStorage.getItem(STORAGE_ITEM_NAME));
  const [username, setUsername] = useState(
    userSettings && userSettings.username
  );
  const [theme, setTheme] = useState(
    userSettings && userSettings.settings.interfaceColor
  );

  const usernameSubmitHandler = username => setUsername(username);

  const updateUserSettingsHandler = settings => {
    setUsername(settings.username);
    setTheme(settings.settings.interfaceColor);
    localStorage.setItem(STORAGE_ITEM_NAME, JSON.stringify(settings));
  };

  return (
    <div className={`App__${theme}`}>
      {!username && <RegisterDialog onUsernameSubmit={usernameSubmitHandler} />}
      {username && (
        <BrowserRouter>
          <Provider store={store}>
            <Header username={username} />
            <MainContent
              username={username}
              userSettings={userSettings}
              onUpdateUserSettings={updateUserSettingsHandler}
            >
              <Switch>
                <Route exact path={HOME_ROUTE_PATH}>
                  <Chat />
                </Route>
                <Route path={SETTINGS_ROUTE_PATH}>
                  <Settings />
                </Route>
              </Switch>
            </MainContent>
          </Provider>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
