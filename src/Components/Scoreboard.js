import React from "react";

const Scoreboard = ({ highscores }) => {
  return (
    <div id="highscores">
      <h2>HIGH SCORES</h2>
      <div>
        {highscores
          .sort((a, b) => b.score - a.score)
          .map(score => {
            return (
              <span
                key={generateRandomKey(score.score, score.name)}
                className="nameandscore"
              >
                <p>
                  {score.name}: {score.score}
                </p>
              </span>
            );
          })
          .slice(0, 8)}
      </div>
    </div>
  );
};

const generateRandomKey = (score, name) => {
  return name.split("").reduce((sum, letter) => {
    return (sum += score + letter.charCodeAt(0));
  }, 0);
};

export default Scoreboard;
