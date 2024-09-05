import { useState, useEffect } from "react";
import { WORD_LENGTH, WORDS } from "./constants";
import "./App.css";
import Row from "./Components/Row";

function App() {
  const [answer, setAnswer] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameFinished, setisGameFinished] = useState(false);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    const rand = Math.floor(Math.random() * (WORDS.length - 1));
    setAnswer(WORDS[rand]);
  }, []);

  useEffect(() => {
    const handleInput = (e) => {
      if (isGameFinished) return;

      if (e.key === "Enter" || currentGuess.length >= 5) {
        if (currentGuess.length !== WORD_LENGTH) {
          return;
        }

        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val === "")] = currentGuess;

        setGuesses(newGuesses);
        setCurrentGuess("");

        if (answer.toLowerCase() === currentGuess.toLowerCase()) {
          setSolved(true);
          setisGameFinished(true);
        }

        if (newGuesses[5] !== "") {
          setisGameFinished(true);
          return;
        }

        return;
      }

      if (e.key === "Backspace") {
        setCurrentGuess((g) => {
          return g.slice(0, -1);
        });
        return;
      }

      setCurrentGuess((g) => {
        return g + e.key;
      });
    };

    window.addEventListener("keydown", handleInput);
    return () => window.removeEventListener("keydown", handleInput);
  }, [currentGuess, answer, guesses, isGameFinished]);

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          {isGameFinished === false && (
            <>
              <h1>Wordle</h1>
              <p>
                Your goal is to guess a 5 letter word I'm thinking. Start typing
                a 5 letter word and press enter to guess it. Any letters that
                match the word I'm thinking of will be highlighted in green. You
                have 6 guesses.
              </p>
            </>
          )}
          {isGameFinished === true && solved === false && (
            <h1>
              <span className="fail">Game Over.</span> The word was{" "}
              <span className="highlight">{answer}</span>!
            </h1>
          )}
          {isGameFinished === true && solved === true && <h1>You got it!</h1>}
        </div>
      </section>
      <section className="game">
        {guesses.map((guess, i) => {
          const isGuess = i === guesses.findIndex((val) => val === "");
          return (
            <Row
              guess={isGuess ? currentGuess : guess}
              hasSubmitGuess={!isGuess && guess !== ""}
              answer={answer}
            />
          );
        })}
      </section>
    </div>
  );
}

export default App;
