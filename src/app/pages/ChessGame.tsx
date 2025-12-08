"use client";

import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedFallingChessBackground from "@/app/layouts/animatedBackground/AimatedFallingChessBackground";
import {
  selectCurrentPage,
  selectPrevPage,
} from "@/app/utils/selectors/pageStateSelector";
import { PageComponents } from "@/app/types/PageTypes";

/**
 * Renders each page
 * @returns Current Page
 */
const ChessGame = () => {
  const currentPage: string = useSelector(selectCurrentPage);
  const prevPage: string = useSelector(selectPrevPage);

  const CurrentComponent = PageComponents[currentPage];
  const PrevComponent = prevPage ? PageComponents[prevPage] : null;

  return (
    <div className="relative w-screen h-screen max-h-screen font-semibold overflow-none overscroll-none bg-page-background">
      <AnimatedFallingChessBackground count={30} />
      <AnimatePresence mode={"sync"}>
        {/* Store the previous page */}
        {prevPage && PrevComponent && (
          <motion.div
            key={`prev-${prevPage}`}
            variants={{
              initial: { x: 0, opacity: 1 },
              animate: { x: "-200%", opacity: 0 },
              exit: { x: "-200%", opacity: 0 },
            }}
            initial="animate"
            animate="exit"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 w-full h-full z-10"
          >
            <PrevComponent />
          </motion.div>
        )}

        {/* Render the current page */}
        {CurrentComponent && (
          <motion.div
            key={`current-${currentPage}`}
            variants={{
              initial: { x: "100%", opacity: 0 },
              animate: { x: 0, opacity: 1 },
              exit: { x: "-100%", opacity: 0 },
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 w-full h-full z-20 overscroll-none"
          >
            <CurrentComponent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChessGame;
