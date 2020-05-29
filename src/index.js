import React from "react";

import useAria from "./useAria";
import useFocus from "./useFocus";
import useCloseOnKeys from "./useCloseOnKeys";
import { ModalProvider, useOpenModal } from "./ModalContext";

export { ModalProvider, useAria, useOpenModal };

export function useModal({ resolve, closeOnKeys, autoFocus }) {
  const ref = React.useRef();
  useFocus(ref, autoFocus);
  useCloseOnKeys(resolve, closeOnKeys);
  return ref;
}
