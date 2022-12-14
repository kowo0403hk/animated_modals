import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal";
import useModal from "./hooks/useModal";
import Input from "./Input";
import { frameLogger } from "./helpers/stateLogger";
import { StackItem, add } from "./helpers/array-utils";
import Notification from "./Notification";

const App = () => {
  // Modal state management
  const { modalOpen, close, open } = useModal();

  // Modal type
  const [modalType, setModalType] = useState("dropIn");

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setModalType(e.target.value);

  // Notification stack

  const [notifications, setNotifications] = useState<StackItem[]>([]);

  // Notification text
  const [text, setText] = useState("Awesome Job! 🚀");
  const handleText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  // Notification style
  const [style, setStyle] = useState("success");
  const handleStyle = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setStyle(e.target.value);

  // Notification position
  const [position, setPosition] = useState("bottom");
  const handlePosition = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setPosition(e.target.value);

  return (
    <>
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

        <ModalContainer label={modalType}>
          {modalOpen ? (
            <Modal
              modalOpen={modalOpen}
              text={modalType}
              type={modalType}
              handleClose={close}
            />
          ) : null}
        </ModalContainer>

        <br />
        <br />

        <SubHeader text="Notification Stack" />
        <Input
          value={text}
          placeholder="Add Notification Text"
          onChange={handleText}
        />

        <br />

        <motion.select className="input" onChange={handleStyle}>
          <option value="success">✅ Success</option>
          <option value="warning">⚠️ Warning</option>
          <option value="error">🛑 Error</option>
          <option value="light">☀️ Light</option>
          <option value="">🌙 Dark</option>
        </motion.select>

        <br />

        <motion.select className="input" onChange={handlePosition}>
          <option value="bottom">👇🏼 Bottom</option>
          <option value="top">☝🏼 Top</option>
        </motion.select>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="add-button"
          onClick={() => setNotifications(add(notifications, text, style))}
        >
          + Stack'em up!
        </motion.button>

        <NotificationContainer position={position}>
          {notifications
            ? notifications.map((notification: StackItem) => (
                <Notification
                  key={notification.id}
                  notifications={notifications}
                  setNotifications={setNotifications}
                  notification={notification}
                />
              ))
            : null}
        </NotificationContainer>
      </motion.main>
    </>
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

interface ModalContainerItems {
  children: JSX.Element | null;
  label: string;
}

const ModalContainer = ({ children, label }: ModalContainerItems) => {
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
      onExitComplete={() => frameLogger(label)}
    >
      {children}
    </AnimatePresence>
  );
};

interface NotiContainer {
  children: JSX.Element[] | null;
  position: string;
}

const NotificationContainer = ({ children, position }: NotiContainer) => {
  return (
    <div className="container">
      <ul className={position}>
        <AnimatePresence
          initial={false}
          onExitComplete={() => frameLogger("Notification Container")}
        >
          {children}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default App;
