import { call, put } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import * as API from "./API";
import * as actionTypes from "./actionTypes";

export default function* workers() {
  const socket = yield call(API.connect);

  const channelWorker = () => {
    return eventChannel(emit => {
      socket.on("register.connected", user => {
        emit({
          type: actionTypes.REGISTER_USER_SUCCESS,
          payload: { data: user }
        });
      });

      socket.on("message.new", messages => {
        emit({
          type: actionTypes.SEND_MESSAGE_SUCCESS,
          payload: {
            data: messages
          }
        });
      });

      socket.on("messages.success", message => {
        emit({
          type: actionTypes.GET_MESSAGES_SUCCESS,
          payload: {
            data: message
          }
        });
      });

      return () => {};
    });
  };

  function registerWorker(action) {
    socket.emit("register.new", action.payload.data);
  }

  function* updateUserSettingsWorker(action) {
    yield put({
      type: actionTypes.UPDATE_USER_SETTINGS_SUCCESS,
      payload: {
        ...action.payload
      }
    });

    const userSettings = action.payload.data;
    const user = { id: userSettings.id, username: userSettings.username };

    socket.emit("register.existing", user);
  }

  const sendMessageWorker = action => {
    socket.emit("message", action.payload.data);
  };

  const getMessagesWorker = () => {
    socket.emit("messages.get");
  };

  function* updateUserPositionWorker(action) {
    yield put({
      type: actionTypes.UPDATE_USER_POSITION_SUCCESS,
      payload: { ...action.payload }
    });
  }

  return {
    registerWorker,
    channelWorker,
    sendMessageWorker,
    getMessagesWorker,
    updateUserSettingsWorker,
    updateUserPositionWorker
  };
}
