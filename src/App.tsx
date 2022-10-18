import React, { FC, useState } from "react";
import { motion } from "framer-motion";
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
        onClick={() => (modalOpen ? close() : open())}
      >
        Launch Modal
      </motion.button>

      {modalOpen && (
        <Modal
          modalOpen={modalOpen}
          text={modalType}
          type={modalType}
          handleClose={close}
        />
      )}
    </div>
  );
};

export default App;
