import React, { FC } from "react";
import { motion } from "framer-motion";
import Backdrop from "../Backdrop";

interface Modals {
  text: string;
  handleClose: Function;
}

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 0.25,
      stiffness: 500,
    },
  },
  exit: { y: "100vh", opacity: 0 },
};

const Modal: FC<Modals> = ({ handleClose, text }: Modals) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className="modal orange-gradient"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p>{text}</p>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
