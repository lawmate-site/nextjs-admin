import { createAction } from "redux-actions";
export const chatConstants = {
  CHAT_REQUEST: "CHAT_REQUEST",
  CHAT_SUCCESS: "CHAT_SUCCESS",
  CHAT_FAILURE: "CHAT_FAILURE",
};
export const getChatRequest = createAction(chatConstants.CHAT_REQUEST);
export const getChatSuccess = createAction(chatConstants.CHAT_SUCCESS);
export const getChatFailure = createAction(chatConstants.CHAT_FAILURE);
