import React, { FC } from "react";
import { motion } from "framer-motion";
import Backdrop from "../Backdrop";

interface Modals {
  text: string;
  handleClose: () => void;
  type: string;
  modalOpen: boolean;
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

const flip = {
  hidden: {
    transform: "scale(0) rotateX(-360deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotateX(0deg)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotateX(360deg)",
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const newspaper = {
  hidden: {
    transform: "scale(0) rotate(720deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotate(0deg)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotate(-720deg)",
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const badSuspension = {
  hidden: {
    y: "-100vh",
    opacity: 0,
    transform: "scale(0) rotateX(-360deg)",
  },
  visible: {
    y: "-25vh",
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "spring",
      damping: 15,
      stiffness: 500,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
  },
};

const Modal: FC<Modals> = ({ handleClose, text, type }: Modals) => {
  return (
    <Backdrop onClick={handleClose}>
      {type === "dropIn" && (
        <motion.div
          onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          className="modal orange-gradient"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <ModalText text={text} />
          <ModalButton onClick={handleClose} label="Close" />
        </motion.div>
      )}
    </Backdrop>
  );
};

interface Text {
  text: string;
}

const ModalText = ({ text }: Text) => {
  return (
    <div className="modal-text">
      <h3>{text}</h3>
      <h5>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
        libero eligendi nobis repudiandae sequi officiis recusandae adipisci
        quam asperiores, nam quidem provident. Quis sint magnam obcaecati
        accusantium ut. Assumenda, tempora.
      </h5>
    </div>
  );
};

interface Button {
  label: string;
  onClick: () => void;
}

const ModalButton = ({ onClick, label }: Button) => {
  return (
    <motion.button
      className="modal-button"
      type="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {label}
    </motion.button>
  );
};

export default Modal;
