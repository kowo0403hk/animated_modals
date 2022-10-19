import React, { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal";
import useModal from "./hooks/useModal";

const App = () => {
  // Modal state management
  const { modalOpen, close, open } = useModal();

  // Modal type
  const [modalType, setModalType] = useState("dropIn");

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setModalType(e.target.value);

  return (
    <motion.main>
      <Header />
      <SubHeader text="Animated Modals" />

      <motion.select className="input" onChange={handleType}>
        <option value="dropIn">🪂 Drop in</option>
        <option value="flip">🛹 Flip</option>
        <option value="newspaper">🗞 Newspaper</option>
      </motion.select>

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
    </motion.main>
  );
};

const Header = () => {
  return (
    <motion.h1 className="pink">
      Framer Motion
      <span className="light-blue"> ⚛️ React</span>
    </motion.h1>
  );
};

interface SubH {
  text: string;
}

const SubHeader = ({ text }: SubH) => {
  return <motion.h2 className="sub-header">{text}</motion.h2>;
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
