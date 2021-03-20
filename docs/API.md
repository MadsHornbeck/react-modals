# API

- [`ModalProvider`](#ModalProvider)
- [`useModal`](#useModal)
- [`Modal`](#Modal)

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
- any additional props are passed to the div element

## `useModal`

This hook is used to open the modal you've passed as a prop. A function is returned that when invoked will open the modal. A promise is returned from this function, which when resolved will close the modal.

### Parameters

- Component

  - Pass a component that uses the `useModal` hook. This component needs to be using `React.forwardRef`.
  - `closeOnKeys` : `Array (string | [key, value])`
    - default : `["Escape"]`
    - [Read more about `closeOnKeys` here.](./closeOnKeys.md)
  - `ariaLabel` - label to allow you to control what screen readers see.
  - `overlayClass` - class that is added to the overlay
  - `modalClass` - class that is added to the modal content

### Injected props

Several props are injected into the component passed to `useModal`.

- `resolve` - is from the `Promise` for the modal. When this promise is resolved the modal will close and unmount.
- `aria`
  - `attributes` - This key should be spread on the content `div` of the modal, it adds the aria-attributes needed to fulfill [aria requirements](https://www.w3.org/TR/wai-aria-practices/#dialog_modal).
  - `labelledBy` - A pseudo-random string to be set as `id` on the header or similar.
  - `describedBy` - A pseudo-random string to be set as `id` on a tag that describes the function of the modal, if possible.
  - `label` - Labels the modal, is passed as a parameter to the hook.
- `setCloseOnKeys` - allows you to set the `closeOnKeys` from within your modal component.
- `setOverlayClose` - allows you to set the `overlayClose` from within your modal component.

Any props passed to as part of opening the modal is also passed directly to the modal component. These will overwrite any previously passed props with the same name.

### return

- props => Promise
  - props passed here will overwrite any previously passed props with the same name
  - The function can be used directly in render and wont cause unnecessary rerenders.
    - The event will _not_ be passed as props.

```js
const openExampleModal = useModal(<ExampleModal />);

<button onClick={openExampleModal}>Open modal</button>;
```

## Static props on modals

Modals allow for two different static props.

- `closeOnKeys`
  - default: `["Escape"]`
  - [Read more about `closeOnKeys` here.](./closeOnKeys.md)
- `overlayClose` - A function that is invoked when the modal overlay is clicked,
  the resolve prop is passed to it and if resolve is invoked the modal will close.
  - default: `resolve => resolve()`
