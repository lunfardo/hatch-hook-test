import { useCallback, useEffect, useState } from "react";
import { runExpensiveTaskAndGetValue } from "./util";
import logo from "./logo.svg";
import "./App.css";

const useGreaterThanFive = (number) => {
  const [isGreater, setIsGreater] = useState(false);

  if (typeof number === "undefined") return false;

  useEffect(() => {
    setIsGreater(number > 5);
  }, [number]);

  return isGreater;
};

//Exercise: increase counter +1 on load
//Exercise: create a hook that return true when the argument is greater than 5, false otherwise
const Example1 = () => {
  const [count, setCount] = useState(0);
  const counterGreaterThanFive = useGreaterThanFive(count);

  useEffect(() => {
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

//Exercise: set function handler using useEffect
const Example2 = () => {
  const [showSupriseHandler, setShowSurpriseHandler] = useState();
  useEffect(() => {
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

//Exercise: create a function handler that adds products to the basket using either addProductToBasket1 or addProductToBasket2
const Example3 = () => {
  const [basket, setBasket] = useState([]);

  const addProductToBasket1 = (product) => {
    setBasket([...basket, product]);
  };

  const addProductToBasket2 = useCallback((product) => {
    setBasket([...basket, product]);
  }, []);

  return (
    <>
      <h3>Example 3</h3>
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

const randomWords = ["apple", "orange", "onion", "potato"];
//Exercise: init hook with an expensive to get value
const Example4 = () => {
  const [value] = useState(runExpensiveTaskAndGetValue());
  const [randomWord, setRandomWord] = useState("");

  const randomWordGetterHandler = useCallback(() => {
    const randomNumber = Math.floor(Math.random() * 4);
    setRandomWord(randomWords[randomNumber]);
  }, []);
  return (
    <>
      <h3>Example 4</h3>
      <button onClick={randomWordGetterHandler}>Get me a random word</button>
      <br />
      {randomWord && (
        <div>
          Your random word is:{randomWord},{value}
        </div>
      )}
    </>
  );
};

function App() {
  const [hiddenCounter, setHiddenCounter] = useState(0);

  return (
    <div className="App">
      <Example1 />
      <Example2 />
      <Example3 />
      <Example4 />
      {/*Excercise: create a hook that handles a hidden state that is only shown on click as an alert.*/}
      <h3>Example 5</h3>
      <button onClick={() => setHiddenCounter(hiddenCounter + 1)}>
        increase hidden counter
      </button>
      <button onClick={() => alert(hiddenCounter)}>Show hidden counter</button>
    </div>
  );
}

export default App;
