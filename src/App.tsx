import React, { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal";
import useModal from "./hooks/useModal";

const App: FC = () => {
  const { modalOpen, close, open } = useModal();
  const [modalType, setModalType] = useState("dropIn");

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.1 }} //equals to CSS => button:hover {transform: scale(1.1)}
        whileTap={{ scale: 0.9 }}
        className="save-button"
        onClick={open}
      >
        Launch Modal
      </motion.button>

      <ModalContainer>
        {modalOpen ? (
          <Modal
            modalOpen={modalOpen}
            text={modalType}
            type={modalType}
            handleClose={close}
          />
        ) : null}
      </ModalContainer>
    </div>
  );
};

interface Container {
  children: JSX.Element | null;
}

const ModalContainer = ({ children }: Container) => {
  // enable the animation of a component that have been removed from the tree
  return (
    <AnimatePresence
      // disable any initial animations on children that are present when the component is first rendered
      initial={false}
      // Only render one component at a time.
      // The exiting component will finish its exit
      // animation before entering component is rendered
      mode="wait"
      // Fires when all exiting nodes have completed animating out
      onExitComplete={() => null}
    >
      {children}
    </AnimatePresence>
  );
};

export default App;
