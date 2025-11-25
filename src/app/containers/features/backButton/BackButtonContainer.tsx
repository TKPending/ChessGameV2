import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { navigateToPage } from "@/app/utils/navigateToPage";
import { resetChessGame } from "@/app/utils/resetChessGame";
import { PageEnum } from "@/app/types/PageTypes";

type BackButtonContainerProps = {
  currentPage: PageEnum;
  nextPage: PageEnum;
  midGame?: boolean;
};

const BackButtonContainer = ({
  currentPage,
  nextPage,
  midGame,
}: BackButtonContainerProps) => {
  const dispatch = useDispatch();

  const handleBackButtonClick = () => {
    if (midGame) {
      resetChessGame(dispatch, { swapColors: false });
    }

    navigateToPage(dispatch, currentPage, nextPage);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleBackButtonClick}
      aria-label="Go back"
      className={`
        absolute top-6 left-12
        flex items-center justify-center
        h-10 w-10 rounded-xl
        border border-neutral-300 dark:border-neutral-700
        bg-white dark:bg-neutral-900
        text-neutral-800 dark:text-neutral-100
        shadow-sm hover:shadow-md
        hover:bg-neutral-100 dark:hover:bg-customGreen
        transition-all duration-150 ease-in-out
      `}
    >
      <ArrowLeft className="w-5 h-5" />
    </motion.button>
  );
};

export default BackButtonContainer;
