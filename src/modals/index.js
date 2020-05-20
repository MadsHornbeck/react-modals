import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import { useFocus, useCloseOnKeys } from "../util";

const ModalContext = React.createContext();
ModalContext.displayName = "ModalContext";

function Modal({ children, handleClose, resolve }) {
  const ref = React.useRef();
  useFocus(ref);
  useCloseOnKeys(resolve, [
    [
      "Escape",
      () =>
        new Promise((r) => {
          setTimeout(() => r("FISK"), 1000);
        }),
    ],
    ["Enter", true],
    "Shift",
  ]);
  const [a, s] = React.useState(true);
  return (
    <div ref={ref} className="modal">
      <div className="overlay" onClick={handleClose}></div>
      <div className="content">
        <button onClick={() => s((e) => !e)}>OST {`${a}`}</button>
        <div tabIndex="0">TAB</div>
        <div tabIndex="asdf">No TAB</div>
        <a href="#">Anchor</a>
        {children}
      </div>
    </div>
  );
}

export function useModal(Component) {
  // TODO: potential issues if passed component is changed after being added
  const { addModal, removeModal } = useContext(ModalContext);
  const openModal = React.useCallback(
    (props) => {
      let component;
      return new Promise((resolve) => {
        component = React.cloneElement(Component, { ...props, resolve });
        addModal(component);
      }).finally(() => {
        removeModal(component);
      });
    },
    [Component, addModal, removeModal]
  );

  return openModal;
}

export function ModalProvider({ ModalWrapper = Modal, children, portal }) {
  const [modals, setModals] = useState([]);

  // TODO: consider consolidating these functions
  const addModal = React.useCallback((modal) => {
    setModals((modals) => [].concat(modals, modal));
  }, []);

  const removeModal = React.useCallback((modal) => {
    setModals((modals) => modals.filter((m) => m !== modal));
  }, []);

  const value = React.useMemo(() => ({ addModal, removeModal }), [
    addModal,
    removeModal,
  ]);

  const modal = modals[modals.length - 1];
  console.log(modals);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modal && (
        <Portal portal={portal}>
          <ModalWrapper
            handleClose={() => {
              if (modal.props.closeOverlay) {
                modal.props.resolve("Overlay close");
              }
            }}
            resolve={modal.props.resolve}
          >
            {modal}
          </ModalWrapper>
        </Portal>
      )}
    </ModalContext.Provider>
  );
}

function Portal({ portal, children }) {
  return portal ? ReactDOM.createPortal(children, portal) : children;
}
