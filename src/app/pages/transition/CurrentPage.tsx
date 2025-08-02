import { RootState } from "@/app/redux/store";
import { PageDetailsType, PageComponents } from "@/app/types/PageTypes";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

const CurrentPage = () => {
  const page: PageDetailsType = useSelector(
    (state: RootState) => state.page.currentPage
  );
  const PageComponent = PageComponents[page.title];

  if (!PageComponent) {
    return <div>Page not found!</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`current-${page.title}`}
        variants={page.in}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <PageComponent />
      </motion.div>
    </AnimatePresence>
  );
};

export default CurrentPage;
