# Setup

`npm install --save @hornbeck/react-modals`

- Add ModalProvider
- Add modal
- Start using your modals

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

## Create modals

```js
import { useModal } from "@hornbeck/react-modals";

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

// In component
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
Confirm.closeOnKeys = [["Escape", false]];
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
.modal {
  z-index: 100;
}

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

// OR

function App() {
  const confirm = useConfirm();

  async function confirmThenFetch() {
    if (await confirm("Can we fetch data?")) {
      const data = await fetch();
    }
  }
}
```
