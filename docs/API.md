# API

- [`ModalProvider`](#ModalProvider)
- [`useModal`](#useModal)
- [`useAria`](#useAria)
- [`useOpenModal`](#useOpenModal)

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

`useModal` should be used in your modal components. 

It does two things:
- Automatically focuses the content of the modal, and returns focus to the previously focused element when it closes.
- Enables the default keyboard binding for closing the modal: `"Escape"`.
  - This can be configured with the `closeOnKeys` prop.

### Parameters

- `resolve`
  - when `useOpenModal` is used a prop `resolve` is injected, pass this to `useModal`. 
  `resolve` is from the `Promise` for the modal. When this promise is resolved the modal will close and unmount.
- `closeOnKeys` : `Array (string | [key, value])`
  - default : `["Escape"]`
  - If a `[key, value]` is passsed, the modal promise will be resolved with `value`.
    - If `value` is a function it will be evaluated
    - If `value` is a promise or a function that returns a promise the promise the modal will close only when that promise has been resolved or rejected
- `autoFocus`: `bool`
  - Default: `true`
  - specifies whether the modal content should be focused on open
  - TODO: maybe delete this?

### return

- ref
  - ref should be added to the content `div` of the modal

## `useAria`

`useAria` should be used in your modals to make them accessible to people using screen readers and the like. 

### Parameters

- label

### return

aria object
- `labelledBy`
  - A pseudo-random string to be set as `id` on the header or similar.
- `describedBy`
  - A pseudo-random string to be set as `id` on a tag that describes the function of the modal, if possible.
- `label`
  - Labels the modal, is passed as a parameter to the hook.
- `attributes`
  - This key should be spread on the content `div` of the modal, it adds the aria-attributes needed.

## `useOpenModal`

This hook is used to open the modal you've passed as a prop. A function is returned that when invoked will open the modal. A promise is returned from this function that is resolved when the modal is closed.

### Parameters

- Component
  - Pass a component that uses the `useModal` hook.

### return

- props => Promise
  - props passed here will overwrite any previously passed props
