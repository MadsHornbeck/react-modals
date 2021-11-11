# API

- [`ModalProvider`](#ModalProvider)
- [`useModal`](#useModal)
- [`Modal`](#Modal)

## `ModalProvider`

Wrap your application with the `ModalProvider` to allow for the usage of
`useModal` in your components.

```js
import { ModalProvider } from "@hornbeck/react-modals";

ReactDOM.render(
  <ModalProvider>
    <App />
  </ModalProvider>
  document.getElementById("root")
);
```

When a modal is open the immediate `parentNode` of the `ModalProvider` will have
`[aria-hidden="true"]` set. In the above example it would be `#root`.

### Parameters

- children
- portal: `modal => void`
  - default: modals are appended to `body`
  - pass a function to portal the modal to a different location in the DOM tree
    if needed e.g. `modal => ReactDOM.createPortal(modal, document.querySelector("#some-id"))`

## `useModal`

`useModal` is used to create a function that opens a modal with the component
passed as argument.
A function is returned that when invoked will open the modal.
A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
is returned from this function, which will resolve when the modal is closed.

```js
function Alert({ aria, resolve }) {
  const handleClose = () => resolve();
  return (
    <div>
      <p>Alert!</p>
      <button type="button" onClick={handleClose}>
        Close
      </button>
    </div>
  );
}

function App() {
  const open = useModal(<Alert aria-label="Alert" />);

  return <button onClick={open}>Open modal</button>;
}
```

### Parameters

- Component
- Props that can be passed to the component
  - `closeOnKeys` : `Array<string | [key, value]>`
    - default : `["Escape"]`
    - [Read more about `closeOnKeys` here.](./closeOnKeys.md)
  - `aria-label` - label for a11y compliance. Either this or adding
    `aria.labelledby` as id on a describing element should always be used
  - `overlayClass` - class that is added to the overlay
  - `modalClass` - class that is added to the modal content

### Injected props

Several props are injected into the component passed to `useModal`.

- `resolve` - is from the `Promise` for the modal. When this promise is resolved
  the modal will close and unmount.
- `aria`
  - `labelledBy` - A pseudo-random string to be set as `id` on the header or
    similar. Use this if you're not passing `aria-label` to your component.
  - `describedBy` - A pseudo-random string to be set as `id` on a tag that
    describes the function of the modal, if possible.
- `setCloseOnKeys` - allows you to set the `closeOnKeys` from within your modal component.
- `setOverlayClose` - allows you to set the `overlayClose` from within your modal component.

An object can be passed as an argument as part of opening the modal, this is
passed as props to the modal component. These will overwrite any previously
passed props with the same name.

### return

- props => Promise
  - props passed here will overwrite any previously passed props with the same name
  - If used directly as event handler the event will _not_ be passed as props.

```js
const openExampleModal = useModal(<ExampleModal />);

<button onClick={openExampleModal}>Open modal</button>;
```

## Static props on modals

Modals allow for two different static props.

- `closeOnKeys`
  - default: `["Escape"]`
  - [Read more about `closeOnKeys` here.](./closeOnKeys.md)
- `overlayClose`
  - default: `resolve => resolve()`
  - A function that is invoked when the modal overlay is clicked,
    the resolve prop is passed to it and if resolve is invoked the modal will close.
