"use client";

import { RootState } from "@/app/redux/store";
import { PageComponents } from "@/app/types/PageTypes";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

const ChessGame = () => {
  const currentPage = useSelector((state: RootState) => state.page.currentPage);
  const prevPage = useSelector((state: RootState) => state.page.prevPage);

  const CurrentComponent = PageComponents[currentPage];
  const PrevComponent = prevPage ? PageComponents[prevPage] : null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-page-background">
      <AnimatePresence mode={"sync"}>
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
            className="absolute top-0 left-0 w-full h-full z-20"
          >
            <CurrentComponent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChessGame;
