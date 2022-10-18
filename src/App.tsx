import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";

const App: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.1 }} //equals to CSS => button:hover {transform: scale(1.1)}
        whileTap={{ scale: 0.9 }}
        className="save-button"
        onClick={() => null}
      >
        Launch Modal
      </motion.button>
    </div>
  );
};

export default App;
