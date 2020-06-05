import React from "react";

import useAria from "./useAria";
import useFocus from "./useFocus";
import useCloseOnKeys from "./useCloseOnKeys";
import { ModalProvider, useOpenModal } from "./ModalContext";

export { ModalProvider, useAria, useOpenModal };

export function useModal({ resolve, closeOnKeys }) {
  const ref = React.useRef();
  useFocus(ref);
  useCloseOnKeys(resolve, closeOnKeys);
  return ref;
}
