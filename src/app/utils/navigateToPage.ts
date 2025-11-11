import { Dispatch } from "@reduxjs/toolkit";
import { setPages } from "@/app/redux/slices/page/pageSlice";

export const navigateToPage = (
  dispatch: Dispatch,
  fromPage: string,
  toPage: string
) => {
  const incoming: string = toPage;
  const outgoing: string = fromPage;

  dispatch(setPages({ current: incoming, previous: outgoing }));
};
