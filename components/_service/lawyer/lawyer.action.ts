import { createAction } from "redux-actions";
export const lawyersConstants = {
  LAWYERS_REQUEST: "LAWYERS_REQUEST",
  LAWYERS_SUCCESS: "LAWYERS_SUCCESS",
  LAWYERS_FAILURE: "LAWYERS_FAILURE",
};
export const getLawyersRequest = createAction(lawyersConstants.LAWYERS_REQUEST);
export const getLawyersSuccess = createAction(lawyersConstants.LAWYERS_SUCCESS);
export const getLawyersFailure = createAction(lawyersConstants.LAWYERS_FAILURE);
