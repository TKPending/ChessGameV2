import { motion } from "framer-motion";

const UndoOptionSlider = () => {
  return (
    <div
      className="flex flex-col items-center justify-start w-full md:w-1/2
                 bg-gradient-to-br from-gray-800 to-gray-900
                 rounded-2xl shadow-xl p-8 border border-gray-700"
    >
      <h2 className="text-2xl font-semibold text-white mb-10">Undo Option</h2>

      <div className="flex items-center justify-between w-full">
        <span className="text-lg text-gray-300">Disallow</span>

        <div className="relative w-20 h-10">
          <motion.div
            className="absolute inset-0 rounded-full bg-gray-600"
            whileTap={{ scale: 0.95 }}
          />
          <motion.div
            className="absolute top-1 left-1 w-8 h-8 bg-customGreen rounded-full shadow-md"
            layout
            transition={{
              type: "spring",
              stiffness: 700,
              damping: 30,
            }}
          />
        </div>

        <span className="text-lg text-gray-300">Allow</span>
      </div>

      <p className="text-gray-400 mt-6 text-sm text-center">
        Toggle to decide whether players can undo moves during the match.
      </p>
    </div>
  );
};

export default UndoOptionSlider;
