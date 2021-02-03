Basic knowledge testing for hooks

Solution Example 1, part 1:
Error on line 25 this will run on a loop, use count => count+1 and remove count from watch array innstead

Solution Example 1, part 2:
Error on line 9 calling hook conditionally. Move logic inside useEffect

Solution Example 2:
Error on line 42 react will try to evaluate this function showing the message on load (react will think it is dispatching a new value), move handler to an object or use useCallback.

```
const Example2 = () => {
  const [showSupriseHandler, setShowSurpriseHandler] = useState({
    handler: "",
  });
  useEffect(() => {
    setShowSurpriseHandler({
      handler: () => {
        alert("this is a surprise");
      },
    });
  });

  return (
    <>
      <h3>Example 2</h3>
      <button onClick={showSupriseHandler.handler}>show surprise text</button>
    </>
  );
};
```

Solution Example 3:
Error on line 58 no memorized function, will be re-calculated on every render circle.
Error on line 62 bascket not on watch list, basket will only hold last product added.

Solution Example 4:
Error on line 85 this expensive task is evaluate in every render circle. It should be using "Lazy initialization" like this () => runExpensiveTaskAndGetValue()

Solution Example 5:
Error on line 107 the whole app is re-rendered on every hook change, move this to another component or use useRef.

```
const Example5 = () => {
    const [hiddenCounter, setHiddenCounter] = useState(0);

    return (
      <h3>Example 5</h3>
      <button onClick={() => setHiddenCounter(hiddenCounter + 1)}>
        increase hidden counter
      </button>
      <button onClick={() => alert(hiddenCounter)}>Show hidden counter</button>
    )
}
```
