# `closeOnKeys`

There are four ways of setting `closeOnKeys`:

- Set it statically on the component when you create it
- Pass it as props
- Pass it as props when opening the modal
- use the `setCloseOnKeys` from the modal props

The last passed `closeOnKeys` is used.

e.g. if you have set it statically on the component, and then pass it as props aswell. The one from props will be used.

The accepted type for `closeOnKeys` is: `Array(string | [key: string, value: (() => any | any)])`

- The modal will be resolved with the value
- If the value is a function it will be invoked first
- If the value is a promise or a function that returns a promise, the modal will close when this promise is resolved or rejected.

### Any of the following is valid:

```
["Escape", "Enter"]
[["Escape", false], ["Enter", true]]
["Escape", ["q", () => 42]]
[["q", () => new Promise(r => {
  setTimeout(r, 1000)
})]]
[["Control", () => API.get()]]
```

### Set `closeOnKeys` statically

```js
function ModalComponent (...) {...}
ModalComponent.closeOnKeys = ["Escape"];
```
