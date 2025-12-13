"use client";

import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedFallingChessBackground from "@/app/layouts/animatedBackground/AimatedFallingChessBackground";
import BackButtonContainer from "@/app/containers/features/backButton/BackButtonContainer";
import {
  selectPageIndex,
  selectPrevPageIndex,
} from "@/app/utils/selectors/pageStateSelector";
import { pageVariants, PageComponents, pages } from "@/app/types/PageTypes";

/**
 * Renders each page
 * @returns Current Page
 */
const ChessGame = () => {
  const currentPageIndex = useSelector(selectPageIndex);
  const prevPageIndex = useSelector(selectPrevPageIndex);

  const direction =
    prevPageIndex === null ? 0 : currentPageIndex > prevPageIndex ? 1 : -1;

  const currentPage = pages[currentPageIndex];
  const CurrentComponent = PageComponents[currentPage];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-page-background">
      <AnimatedFallingChessBackground count={30} />

      {currentPageIndex !== 0 && (
        <BackButtonContainer currentPageIndex={currentPageIndex} />
      )}

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentPage}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <CurrentComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ChessGame;
