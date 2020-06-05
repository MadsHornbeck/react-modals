# API

- [`ModalProvider`](#ModalProvider)
- [`useModal`](#useModal)

## `ModalProvider`

Wrap your application with the `ModalProvider`.

```js
import { ModalProvider } from "@hornbeck/react-modals";

ReactDOM.render(
  <ModalProvider>
    <App />
  </ModalProvider>
  document.getElementById("root")
);
```

### Parameters

- children
  - Children is wrapped in a `div` on which `[aria-hidden="true"]` will be set when a modal is open.
- portal: `modal => void`
  - default: modals are appended after children in DOM tree
  - pass a function to set a portal if needed e.g.
  - `modal => ReactDOM.createPortal(modal, document.body)`

## `useModal`

This hook is used to open the modal you've passed as a prop. A function is returned that when invoked will open the modal. A promise is returned from this function, which when resolved will close the modal.

### Parameters

- Component

  - Pass a component that uses the `useModal` hook. This component needs to be using `React.forwardRef`.
  - `closeOnKeys` : `Array (string | [key, value])`
    - default : `["Escape"]`
    - If a `[key, value]` is passsed, the modal promise will be resolved with `value`.
      - If `value` is a function it will be evaluated
      - If `value` is a promise or a function that returns a promise the promise the modal will close only when that promise has been resolved or rejected
  - `ariaLabel` - label to allow you to control what screen readers see.

### Injected props

Several props are injected into the component passed to `useModal`.

- `resolve` - is from the `Promise` for the modal. When this promise is resolved the modal will close and unmount.
- `ref` - should be added to the HTML element of the modal content.
  - This is used to automatically focus the content of the modal
  - Focus is locked to the content of HTML element while the modal is open.
  - Focus is returned to the previously focused element when the modal closes.
- `aria`
  - `attributes` - This key should be spread on the content `div` of the modal, it adds the aria-attributes needed to fulfill [aria requirements](https://www.w3.org/TR/wai-aria-practices/#dialog_modal).
  - `labelledBy` - A pseudo-random string to be set as `id` on the header or similar.
  - `describedBy` - A pseudo-random string to be set as `id` on a tag that describes the function of the modal, if possible.
  - `label` - Labels the modal, is passed as a parameter to the hook.

### return

- props => Promise
  - props passed here will overwrite any previously passed props
