import { useState } from "react";
import "./App.css";
import Button from "./components/Buttons";

function App() {
  const cities = {
    England: "London",
    Spain: "Madrid",
    Italy: "Rome",
    France: "Paris",
  };
  // data can be replaced with other examples

  const arr = Object.keys(cities);
  const arr1 = Object.values(cities);
  const location = shuffle(arr.concat(arr1));

  const [choices, setChoices] = useState(makeHash(location));
  // console.log(choices);

  function makeHash(arr) {
    return arr.map((x) => {
      return {
        id: x,
        text: x,
        clicked: false,
      };
    });
  }

  function setAllFalse() {
    setChoices((prev) =>
      prev.map((x) => {
        return { ...x, clicked: false };
      })
    );
  }

  const check = [];
  for (let i = 0; i < choices.length; i++) {
    if (choices[i].clicked === true) {
      check.push(choices[i].text);
    }
  }
  if (check.length === 2) {
    const val = check.pop();
    const val1 = check.pop();
    if (cities[val] === val1 || cities[val1] === val) {
      const newArr = choices.filter((x) => x.clicked === false);
      setChoices(newArr);
    }
    setAllFalse(cities);
  }

  function toggleButton(id) {
    setChoices((prevState) =>
      prevState.map((x) => {
        return id === x.id ? { ...x, clicked: !x.clicked } : x;
      })
    );
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  const elements = choices.map((x) => {
    return (
      <Button
        key={x.id}
        text={x.text}
        handleClick={() => toggleButton(x.id)}
        clicked={x.clicked}
      />
    );
  });

  return (
    <div className='App'>
      <p>{elements}</p>
    </div>
  );
}

export default App;
