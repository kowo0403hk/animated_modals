import React, { FC, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Backdrop from "../Backdrop";
import { stateLogger } from "../helpers/stateLogger";

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
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
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

const Modal: FC<Modals> = ({ handleClose, text, type }: Modals) => {
  useEffect(() => {
    stateLogger("Modal", true);
    return stateLogger("Modal", false);
  }, []);

  const modalRender = (type: string): JSX.Element => {
    let cssVariant: Variants = {};

    if (type === "dropIn") {
      cssVariant = dropIn;
    } else if (type === "flip") {
      cssVariant = flip;
    } else {
      cssVariant = newspaper;
    }

    return (
      <motion.div
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        className="modal orange-gradient"
        variants={cssVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ModalText text={text} />
        <ModalButton onClick={handleClose} label="Close" />
      </motion.div>
    );
  };

  return <Backdrop onClick={handleClose}>{modalRender(type)}</Backdrop>;
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
