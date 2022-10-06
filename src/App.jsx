import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Buttons";

function App() {
  const cities = {
    England: "London",
    Spain: "Madrid",
    Italy: "Rome",
    France: "Paris",
    Bucharest: "Hungary",
  };
  // data can be replaced with other examples

  const [choices, setChoices] = useState([]);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const arr = Object.keys(cities);
    const arr1 = Object.values(cities);
    const location = shuffle(arr.concat(arr1));
    setChoices(makeHash(location));
  }, [reset]);

  // console.log(choices);

  function makeHash(arr) {
    return arr.map((x) => {
      return {
        id: x,
        text: x,
        clicked: 0,
      };
    });
  }

  function setAllFalse() {
    setChoices((prev) =>
      prev.map((x) => {
        return { ...x, clicked: 0 };
      })
    );
  }

  const check = [];
  for (let i = 0; i < choices.length; i++) {
    if (choices[i].clicked === 1) {
      check.push(choices[i].text);
    }
  }

  if (check.length === 2) {
    const val = check.pop();
    const val1 = check.pop();
    if (cities[val] === val1 || cities[val1] === val) {
      const newArr = choices.filter((x) => x.clicked === 0);
      setChoices(newArr);
    } else {
      setChoices((prev) =>
        prev.map((x) => {
          if (x.clicked === 1) return { ...x, clicked: 2 };
          else return { ...x };
        })
      );
    }
  }

  function toggleButton(id) {
    let counter = 0;
    for (let i = 0; i < choices.length; i++) {
      if (choices[i].clicked === 2) {
        counter++;
      }
    }
    if (counter === 2) {
      counter = 0;
      setAllFalse();
    }
    setChoices((prevState) =>
      prevState.map((x) => {
        return id === x.id ? { ...x, clicked: 1 } : x;
      })
    );
  }

  function playAgain() {
    setReset(!reset);
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
      <button onClick={playAgain}>Reset</button>
    </div>
  );
}

export default App;
