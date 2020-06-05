# Setup

`npm install --save @hornbeck/react-modals`

- add ModalProvider
- add modal

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

## Add modal component

```js
import { useModal } from "@hornbeck/react-modals";

const Modal = React.forwardRef(({ aria, children, handleClose }, ref) => {
  return (
    <div className="modal">
      <div className="overlay" onClick={handleClose}></div>
      <div className="content" ref={ref} {...aria.attributes}>
        {children}
      </div>
    </div>
  );
});

// To use the modal do the following
// Example of a confirm modal

const Confirm = React.forwardRef((props, ref) => (
  <Modal ref={ref} aria={props.aria} handleClose={() => resolve(false)}>
    <p>{props.text}</p>
    <div>
      <button onClick={() => props.resolve(true)}>Okay</button>
      <button onClick={() => props.resolve(false)}>Cancel</button>
    </div>
  </Modal>
));

function App() {
  const confirm = useModal(<Confirm text="Confirm this" />);

  return (
    <div>
      <button onClick={() => confirm()}>Confirm</button>
    </div>
  );
}
```

## Add styling

```css
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

.content {
  position: relative;
  margin: auto;
  overflow: auto;
  max-height: 60vh; /* Setting a max-height of 100vh or less is recommended */
  /* Set the visual style for modal*/
  background-color: white;
  width: 20rem;
  padding: 5rem;
}

/* Disables scrolling in content behind modal */
[aria-hidden="true"] {
  overflow: hidden;
}
```

These are just examples and can be configured and changed as wanted.
