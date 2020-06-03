# Rationale

I always felt it was a little weird that modals had to be arbitrarily be placed in components in react. 
I don't think it makes sense to handle the open / close state of the modal in the state of the parent, and I've always wanted to be able to use modals as you can with the builtin javascript function [confirm](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm) (that you are never supposed to use in modern web development).

This package allows you to reuse modals without having to worry about whether they are open or not, all while being able to seemlessly integrate them into your control flows.

Now you can do something like this:

```js
const useConfirm = text => useOpenModal(<Confirm text={text}/>) 

function App () {
  const confirm = useConfirm();

  const doStuff = async () => {
    if (await confirm("Do you really want to do stuff")) {
      /* do stuff */
    }
  }

  return <div></div>
}
```