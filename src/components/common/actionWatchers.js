import { takeEvery, takeLatest, call, take, put } from "redux-saga/effects";
import * as userActions from "./actionTypes";
import workers from "./actionWorkers";

export default function* watchers() {
  const {
    registerWorker,
    channelWorker,
    sendMessageWorker,
    getMessagesWorker,
    updateUserSettingsWorker,
    updateUserPositionWorker
  } = yield workers();

  function* registerWatcher() {
    yield takeLatest(userActions.REGISTER_USER, registerWorker);
  }

  function* updateUserSettingsWatcher() {
    yield takeLatest(
      userActions.UPDATE_USER_SETTINGS,
      updateUserSettingsWorker
    );
  }

  function* sendMessageWatcher() {
    yield takeEvery(userActions.SEND_MESSAGE, sendMessageWorker);
  }

  function* getMessagesWatcher() {
    yield takeLatest(userActions.GET_MESSAGES, getMessagesWorker);
  }

  function* updateUserPositionWatcher() {
    yield takeLatest(
      userActions.UPDATE_USER_POSITION,
      updateUserPositionWorker
    );
  }

  function* channelWatcher() {
    const channel = yield call(channelWorker);

    while (true) {
      const action = yield take(channel);

      yield put(action);
    }
  }

  return {
    registerWatcher,
    channelWatcher,
    sendMessageWatcher,
    getMessagesWatcher,
    updateUserSettingsWatcher,
    updateUserPositionWatcher
  };
}
