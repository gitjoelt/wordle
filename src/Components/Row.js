import { WORD_LENGTH } from "../constants";

export default function Row({ guess, hasSubmitGuess, answer }) {
  const tiles = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];
    let className = "tile";

    if (hasSubmitGuess) {
      if (char.toUpperCase() === answer[i]) {
        className += " correct";
      } else if (answer.includes(char.toUpperCase())) {
        className += " contains";
      } else {
        className += " wrong";
      }
    }
    tiles.push(
      <div key={i} className={className}>
        {char}
      </div>
    );
  }

  return <div className="row">{tiles.map((tile) => tile)}</div>;
}
