# `closeOnKeys`

There are four ways of setting `closeOnKeys`:

1. Set it statically on the component when you create it
2. Pass it as props to the component when passed to `useModal`
3. Pass it as argument to the function from `useModal`
4. use the `setCloseOnKeys` from props in the modal component

The last passed `closeOnKeys` is used. e.g. if you have set it statically on the component, and then pass it as props aswell. The one from props will be used.
The priority can be seen above, higher number "wins".
The accepted type for `closeOnKeys` is: `Array<string | [key: string, value: (() => any | any)]>`

- The modal will be resolved with the value
- If the value is a function it will be invoked first
- If the value is a promise or a function that returns a promise, the modal will
  close after this promise is resolved or rejected.

### Any of the following are valid:

```
["Escape", "Enter"]
[["Escape", false], ["Enter", true]]
["Escape", ["q", () => 42]]
[["q", () => new Promise((r) => {
  setTimeout(r, 1000)
})]]
[["Control", () => API.get()]]
```

### Set `closeOnKeys` statically

```js
function ModalComponent (...) {...}
ModalComponent.closeOnKeys = ["Escape"];
```
