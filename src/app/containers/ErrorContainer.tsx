import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { setErrorNotification } from "@/app/redux/slices/error/errorSlice";

const ErrorContainer = () => {
  const dispatch = useDispatch();
  const isError: boolean = useSelector(
    (state: RootState) => state.error.isError
  );
  const errorMessage: string = useSelector(
    (state: RootState) => state.error.message
  );

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isError) {
      setVisible(true);
      const timeout = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          dispatch(setErrorNotification(true));
        }, 500);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isError, dispatch]);

  return (
    <div
      className={`absolute top-[2%] right-[2%] h-auto w-auto p-2 rounded-lg bg-white flex items-center gap-2 z-50 transition-transform duration-500 ease-in-out ${
        visible ? "translate-x-0 opacity-100" : "translate-x-[100%] opacity-0"
      }`}
    >
      <div className="border-2 border-red-500 p-2 flex items-center justify-center rounded-full w-8 h-8">
        <FontAwesomeIcon
          icon={faExclamation}
          className="font-bold text-red-500"
        />
      </div>
      <p className="text-base">{errorMessage}</p>
    </div>
  );
};

export default ErrorContainer;
