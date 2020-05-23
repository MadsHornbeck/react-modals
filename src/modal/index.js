import React from "react";

import useAria from "./useAria";
import useFocus from "./useFocus";
import useCloseOnKeys from "./useCloseOnKeys";
import { ModalProvider, useOpenModal } from "./ModalContext";

export { ModalProvider, useAria, useCloseOnKeys, useFocus, useOpenModal };

export function useModal({ resolve, closeOnkeys, autoFocus }) {
  const ref = React.useRef();
  useFocus(ref, autoFocus);
  useCloseOnKeys(resolve, closeOnkeys);
  return ref;
}
