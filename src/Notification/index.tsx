import { motion, Variants } from "framer-motion";
import React, { FC } from "react";
import { remove, StackItem } from "../helpers/array-utils";

const notiVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.2, transition: { duration: 0.1 } },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: {
    opacity: 0,
    scale: 0.2,
    transition: { ease: "easeOut", duration: 0.15 },
  },
  hover: { scale: 1.05, transition: { duration: 0.1 } },
};

interface NotiProps {
  notifications: StackItem[];
  setNotifications: React.Dispatch<React.SetStateAction<StackItem[]>>;
  notification: StackItem;
}

const Notification: FC<NotiProps> = ({
  notifications,
  setNotifications,
  notification,
}: NotiProps) => {
  const { text, style } = notification;

  const handleClose = () =>
    setNotifications(remove(notifications, notification));

  const styleType = () => {
    // Controlled by selection menu
    switch (style) {
      case "success":
        return { background: "linear-gradient(15deg, #6adb00, #04e800)" };
      case "error":
        return { background: "linear-gradient(15deg, #ff596d, #d72c2c)" };
      case "warning":
        return { background: "linear-gradient(15deg, #ffac37, #ff9238)" };
      case "light":
        return { background: "linear-gradient(15deg, #e7e7e7, #f4f4f4)" };
      default:
        return { background: "linear-gradient(15deg, #202121, #292a2d)" };
    }
  };

  return (
    <motion.li
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      style={styleType()} // Change the style based on style selection
      variants={notiVariants} // Defined animation states
      whileHover="hover" // Animation on hover gesture
      initial="initial" // Starting animation
      animate="animate" // Values to animate to
      exit="exit" // Target to animate to when removed from the tree>
    >
      <h3
        style={{ color: style ? "#030303" : "#929292" }}
        className="notification-text"
      >
        {text}
      </h3>
      <CloseButton
        color={style ? "#030303" : "#989898"}
        handleClose={handleClose}
      />
    </motion.li>
  );
};

interface PathProps {
  d: string;
  color: string;
}

const Path = ({ color, d }: PathProps) => {
  return (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke={color}
      strokeLinecap="square"
      color={color}
      d={d}
    />
  );
};

interface Button {
  handleClose: () => void;
  color: string;
}

const CloseButton = ({ handleClose, color }: Button) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      onClick={handleClose}
      className="close"
    >
      <svg width="18" height="18" viewBox="0 0 23 23">
        <Path color={color} d="M 3 16.5 L 17 2.5" />
        <Path color={color} d="M 3 2.5 L 17 16.346" />
      </svg>
    </motion.div>
  );
};

export default Notification;
