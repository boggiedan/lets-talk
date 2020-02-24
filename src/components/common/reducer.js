import * as actionTypes from "./actionTypes";
import { defaultSettings } from "../common/defaultsettings/defaultSettings";
import { HOME_ROUTE_PATH } from "../../config/routes";

const initialState = {
  user: {
    ...defaultSettings,
    isFetching: false
  },

  userPosition: HOME_ROUTE_PATH,

  messages: {
    isFetching: false,
    unreadMessages: 0,
    items: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER_SUCCESS:
      const { data } = action.payload;

      return {
        ...state,
        user: {
          ...state.user,
          id: data.id,
          username: data.username,
          isFetching: false,
          errorMessage: ""
        }
      };

    case actionTypes.UPDATE_USER_SETTINGS_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.data
        }
      };

    case actionTypes.SEND_MESSAGE_SUCCESS:
      const unreadMessages =
        state.userPosition === HOME_ROUTE_PATH
          ? 0
          : state.messages.unreadMessages + 1;

      return {
        ...state,
        messages: {
          ...state.messages,
          items: [...state.messages.items, action.payload.data],
          unreadMessages
        }
      };

    case actionTypes.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: {
          ...state.messages,
          items: action.payload.data
        }
      };

    case actionTypes.UPDATE_USER_POSITION_SUCCESS:
      const userPosition = action.payload.data;
      const unread =
        userPosition === HOME_ROUTE_PATH ? 0 : state.messages.unreadMessages;

      return {
        ...state,
        userPosition: action.payload.data,
        messages: {
          ...state.messages,
          unreadMessages: unread
        }
      };

    default:
      return state;
  }
};
