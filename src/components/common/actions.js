import * as types from "./actionTypes";

export const registerUser = username => ({
  type: types.REGISTER_USER,
  payload: {
    data: username
  }
});

export const updateUserSettings = settings => ({
  type: types.UPDATE_USER_SETTINGS,
  payload: {
    data: settings
  }
});

export const sendMessage = (username, userId, message) => ({
  type: types.SEND_MESSAGE,
  payload: {
    data: {
      value: message,
      username,
      userId
    }
  }
});

export const getMessages = () => ({ type: types.GET_MESSAGES });

export const updateUserPosition = position => ({
  type: types.UPDATE_USER_POSITION,
  payload: { data: position }
});
