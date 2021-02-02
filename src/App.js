import { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const useGreaterThanFive = (number) => {
  const [isGreater, setIsGreater] = useState(false);
  //ERROR calling hook conditionally. Move logic inside useEffect
  // if (typeof number === "undefined") return false;
  useEffect(() => {
    setIsGreater(number > 5);
  }, [number]);

  return isGreater;
};

const Example1 = () => {
  const [count, setCount] = useState(0);
  //Exercise: create a hook that return true when the argument is greater than 5, false otherwise
  const counterGreaterThanFive = useGreaterThanFive(count);

  useEffect(() => {
    //Exercise: increase counter +1 on load
    //ERROR: you should set the variable you are watching, use count => count+1 innstead
    setCount(count + 1);
  }, [count]);

  return (
    <>
      <h3>Example 1</h3>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increate counter</button>
      {counterGreaterThanFive && <div>Counter now is greater than five</div>}
    </>
  );
};

const Example2 = () => {
  const [showSupriseHandler, setShowSurpriseHandler] = useState();
  useEffect(() => {
    //Exercise: set function handler using useEffect
    //ERROR: react will try to evaluate this function showing the message on load, move handler to an object
    setShowSurpriseHandler(() => {
      alert("this is a surprise");
    });
  });
  return (
    <>
      <h3>Example 2</h3>
      <button onClick={showSupriseHandler}>show surprise text</button>
    </>
  );
};

const Example4 = () => {
  const [basket, setBasket] = useState([]);

  //Error: no memorized function, will re-render every time
  const addProductToBasket1 = (product) => {
    setBasket([...basket, product]);
  };

  //Error: bascket no on watch list, basket will only hold last product added.
  const addProductToBasket2 = useCallback((product) => {
    setBasket([...basket, product]);
  }, []);
  return (
    <>
      <h3>Example 4</h3>
      <button onClick={() => addProductToBasket1("apple")}>Add Apple</button>
      <button onClick={() => addProductToBasket1("orange")}>Add Orange</button>
      <button onClick={() => addProductToBasket1("onion")}>Add Onion</button>
      <br />
      <ol>
        {basket.map((product) => (
          <li>{product}</li>
        ))}
      </ol>
    </>
  );
};

function App() {
  //Excercise: create a hook that handles a hidden state that is only shown on click as an alert.
  //ERROR: component is re-render on every hook change, move this to another component or use useRef.
  const [hiddenCounter, setHiddenCounter] = useState(0);

  return (
    <div className="App">
      <Example1 />
      <Example2 />
      <h3>Example 3</h3>
      <button onClick={() => setHiddenCounter(hiddenCounter + 1)}>
        increase hidden counter
      </button>
      <button onClick={() => alert(hiddenCounter)}>Show hidden counter</button>
      <Example4 />
    </div>
  );
}

export default App;
