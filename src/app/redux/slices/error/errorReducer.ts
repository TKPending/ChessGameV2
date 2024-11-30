import { PayloadAction } from "@reduxjs/toolkit";
import { ErrorType } from "@/app/types/ErrorType";


export const errorNotificationTriggerReducer = (
  state: ErrorType,
  action: PayloadAction<boolean>
) => {
  state.isError = action.payload;
};

export const errorMessageReducer = (
    state: ErrorType,
    action: PayloadAction<string>
  ) => {
    state.message = action.payload;
  };

