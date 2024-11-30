import { createSlice } from "@reduxjs/toolkit";
import { ErrorType } from "@/app/types/ErrorType";
import { errorMessageReducer, errorNotificationTriggerReducer } from "./errorReducer";

const initialState: ErrorType = {
  isError: false,
  message: "Problem with displaying the error message"
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setErrorNotification: errorNotificationTriggerReducer,
    setErrorMessage: errorMessageReducer,
  },
});

export const {
  setErrorNotification,
  setErrorMessage,
} = errorSlice.actions;

export default errorSlice.reducer;
