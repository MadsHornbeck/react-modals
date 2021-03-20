# Setup

`npm install --save @hornbeck/react-modals`

- Add ModalProvider
- Add modal
- Using your modals

## Add `ModalProvider`

```js
import { ModalProvider } from "@hornbeck/react-modals";

ReactDOM.render(
  <ModalProvider>
    <App />
  </ModalProvider>,
  document.getElementById("root")
);
```

## Add modal

```js
import { Modal, useModal } from "@hornbeck/react-modals";

// Example of an alert modal

const Alert = React.forwardRef(({ aria, children, resolve, text }, ref) => {
  const handleClose = () => resolve();
  return (
    <>
      <p>{text}</p>
      <button onClick={handleClose}></button>
    </>
  );
});

export const useAlert = (text) => useModal(<Alert text={text} />);

const alert = useAlert("Hello, world!");
alert();
// can also overwrite props passed like so:
alert({ text: "Goodbye, world!" });

// Alternatively use like this directly in component
const alert = useModal(Alert);
alert({ text: "Hello, world!" });

// Example of a confirm modal
const Confirm = React.forwardRef((props, ref) => (
  <>
    <p>{props.text}</p>
    <div>
      <button onClick={() => props.resolve(true)}>Okay</button>
      <button onClick={() => props.resolve(false)}>Cancel</button>
    </div>
  </>
));
Confirm.overlayClose = (resolve) => resolve(false);

const useConfirm = (text) => useModal(<Confirm text={text} />);
```

You can add `modalClass` or `overlayClass` if you need to style the modal content
container or the overlay.
Alternatively you can just add style targeting `.modal-overlay` and `.modal-content`.

No style is added except for the required ones, so the default is going to look
a bit odd.
Add the following for a base styling that should make it look slightly better.
It should be relatively simple to extend or change to fit your needs:

```css
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: white;
  width: 20rem;
  max-height: 60vh;
  padding: 5rem;
}
```

### Custom Modal component

It's also possible to create your own custom component instead of using the one
provided by `@hornbeck/react-modals`. If there is interest in a more detailed
description of how this is done
[open an issue on github](https://github.com/MadsHornbeck/react-modals/issues).

## Using your modals

```js
function App() {
  const alert = useAlert();

  return (
    <div>
      <button type="button" onClick={alert}></button>
    </div>
  );
}
```
