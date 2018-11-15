import axios from "axios";

const URL = "https://snek2-be.herokuapp.com/api/scoreboard";

export const getHighscores = () => {
  return axios.get(URL).then(res => res.data.scores);
};
export const postHighscore = (name, score) => {
  return axios.post(URL, { name, score }).then(res => res.data.newScore);
};
