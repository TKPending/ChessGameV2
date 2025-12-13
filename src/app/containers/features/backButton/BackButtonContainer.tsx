import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { resetChessGame } from "@/app/utils/resetChessGame";
import { previousPage, goToPage } from "@/app/redux/slices/page/pageSlice";
import { PageEnum, pages } from "@/app/types/PageTypes";

type BackButtonContainerProps = {
  currentPageIndex: number;
};

const BackButtonContainer = ({
  currentPageIndex,
}: BackButtonContainerProps) => {
  const dispatch = useDispatch();

  const handleBackButtonClick = () => {
    if (currentPageIndex === 4) {
      dispatch(goToPage(pages.indexOf(PageEnum.landing)));
      return;
    }

    if (currentPageIndex === 3) {
      resetChessGame(dispatch, { swapColors: false });
      dispatch(goToPage(pages.indexOf(PageEnum.enterPlayerNames)));
      return;
    }

    dispatch(previousPage());
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleBackButtonClick}
      aria-label="Go back"
      className={`
        fixed top-6 left-6 md:left-12
        flex items-center justify-center
        h-10 w-10 rounded-xl
        border border-neutral-300 dark:border-neutral-700
        bg-white dark:bg-neutral-900
        text-neutral-800 dark:text-neutral-100
        shadow-sm hover:shadow-md
        hover:bg-neutral-100 dark:hover:bg-customGreen
        transition-all duration-150 ease-in-out z-50
      `}
    >
      <ArrowLeft className="w-5 h-5" />
    </motion.button>
  );
};

export default BackButtonContainer;
