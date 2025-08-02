import { RootState } from "@/app/redux/store";
import { PageDetailsType, PageComponents } from "@/app/types/PageTypes";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

const PreviousPage = () => {
  const page: PageDetailsType | null = useSelector(
    (state: RootState) => state.page.prevPage
  );

  if (!page) return null;

  // Look up the React component using the page title
  const PageComponent = PageComponents[page.title];

  if (!PageComponent) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`prev-${page.title}`}
        variants={page.out}
        initial="animate"
        animate="exit"
        exit="exit"
        transition={{ duration: 0.4 }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <PageComponent />
      </motion.div>
    </AnimatePresence>
  );
};

export default PreviousPage;
