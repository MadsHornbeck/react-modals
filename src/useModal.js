import React from "react";

import ModalContext from "./ModalContext";
import Modal from "./Modal";

export default function useModal(component) {
  const dispatch = React.useContext(ModalContext);
  return React.useCallback(
    (e) => {
      // Naive way of detecting events, might need to be refined.
      const props = e && e.nativeEvent ? undefined : e;
      let modal;
      return new Promise((resolve) => {
        modal = React.createElement(Modal, { props, resolve }, component);
        dispatch({ type: "add", modal });
      }).finally(() => {
        dispatch({ type: "remove", modal });
      });
    },
    [component, dispatch]
  );
}
