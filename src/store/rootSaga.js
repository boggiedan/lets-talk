import { all, fork } from "redux-saga/effects";
import watchers from "../components/common/actionWatchers";

function* rootSaga() {
  const {
    registerWatcher,
    channelWatcher,
    sendMessageWatcher,
    getMessagesWatcher,
    updateUserSettingsWatcher,
    updateUserPositionWatcher
  } = yield watchers();

  yield all([
    fork(registerWatcher),
    fork(channelWatcher),
    fork(sendMessageWatcher),
    fork(getMessagesWatcher),
    fork(updateUserSettingsWatcher),
    fork(updateUserPositionWatcher)
  ]);
}

export default rootSaga;
