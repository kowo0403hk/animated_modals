import { FC } from "react";
import { motion } from "framer-motion";

interface Backdrops {
  children: JSX.Element;
  onClick: () => void;
}

// this component works as an overlay

const Backdrop: FC<Backdrops> = ({ children, onClick }: Backdrops) => {
  return (
    <motion.div
      className="backdrop"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
