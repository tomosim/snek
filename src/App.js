import React, { Component } from "react";
import "./App.css";
import Start from "./Components/Start";
import { getHighscores, postHighscore } from "./api";
import Scoreboard from "./Components/Scoreboard";
import EnterName from "./Components/EnterName";

class App extends Component {
  state = {
    gridArr: [],
    snekArr: [{ x: 9, y: 9 }],
    scores: [],
    direction: "right",
    food: null,
    points: 0,
    lost: false
  };

  componentDidMount() {
    const gridArr = [];
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        gridArr.push(
          <div
            className={`grid-cell`}
            id={
              this.state.snekArr.find(cell => cell.x === x && cell.y === y)
                ? "snekked"
                : ""
            }
            key={`${x},${y}`}
          />
        );
      }
    }
    const index = Math.floor(Math.random() * gridArr.length);
    gridArr[index] = (
      <div className={`grid-cell`} id="food" key={gridArr[index].key} />
    );
    getHighscores().then(scores =>
      this.setState({
        gridArr,
        food: index,
        scores
      })
    );
  }

  render() {
    return (
      <div className="App" tabIndex="0" onKeyDown={this.handleKeyPress}>
        <div id="title">snek2</div>
        <h2 id="points">{this.state.points}</h2>
        <div id="main">
          {this.state.scores.length && (
            <Scoreboard highscores={this.state.scores} />
          )}
          <div id="game">
            {this.state.lost && <h1 id="loser">YOU LOSE</h1>}
            {this.state.lost && <EnterName addHighscore={this.postScore} />}
            <div id="grid">{this.state.gridArr}</div>
          </div>
        </div>
        <Start play={this.play} />
      </div>
    );
  }

  play = () => {
    this.state.timer && clearInterval(this.state.timer);
    const timer = setInterval(() => this.moveSnek(this.state.direction), 200);
    this.setState({
      lost: false,
      timer,
      points: 0,
      snekArr: [{ x: 9, y: 9 }],
      direction: "right"
    });
  };

  handleKeyPress = event => {
    const directions = ["up", "down", "left", "right"];
    if (directions.includes(event.key.slice(5).toLowerCase()))
      this.setState({ direction: event.key.slice(5).toLowerCase() });
  };

  moveSnek = direction => {
    this.isDead();
    this.setState({ direction });
    const newSnekArr = [...this.state.snekArr];
    let newPoints = 0;

    if (
      newSnekArr[newSnekArr.length - 1].x ==
        this.state.gridArr[this.state.food].key.split(",")[0] &&
      newSnekArr[newSnekArr.length - 1].y ==
        this.state.gridArr[this.state.food].key.split(",")[1]
    ) {
      newPoints = 1;
    } else newSnekArr.shift();

    if (direction === "right") {
      newSnekArr.push({
        x:
          this.state.snekArr[this.state.snekArr.length - 1].x + 1 > 19
            ? 0
            : this.state.snekArr[this.state.snekArr.length - 1].x + 1,
        y: this.state.snekArr[this.state.snekArr.length - 1].y
      });
    }
    if (direction === "left") {
      newSnekArr.push({
        x:
          this.state.snekArr[this.state.snekArr.length - 1].x - 1 < 0
            ? 19
            : this.state.snekArr[this.state.snekArr.length - 1].x - 1,
        y: this.state.snekArr[this.state.snekArr.length - 1].y
      });
    }
    if (direction === "up") {
      newSnekArr.push({
        y:
          this.state.snekArr[this.state.snekArr.length - 1].y - 1 < 0
            ? 19
            : this.state.snekArr[this.state.snekArr.length - 1].y - 1,
        x: this.state.snekArr[this.state.snekArr.length - 1].x
      });
    }
    if (direction === "down") {
      newSnekArr.push({
        y:
          this.state.snekArr[this.state.snekArr.length - 1].y + 1 > 19
            ? 0
            : this.state.snekArr[this.state.snekArr.length - 1].y + 1,
        x: this.state.snekArr[this.state.snekArr.length - 1].x
      });
    }

    const gridArr = [];
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        gridArr.push(
          <div
            className={`grid-cell`}
            id={
              newSnekArr.find(cell => cell.x === x && cell.y === y)
                ? "snekked"
                : ""
            }
            key={`${x},${y}`}
          />
        );
      }
    }

    const index = Math.floor(Math.random() * gridArr.length);
    newPoints
      ? (gridArr[index] = (
          <div className={`grid-cell`} id="food" key={gridArr[index].key} />
        ))
      : (gridArr[this.state.food] = (
          <div
            className={`grid-cell`}
            id="food"
            key={gridArr[this.state.food].key}
          />
        ));

    this.setState({
      snekArr: newSnekArr,
      gridArr,
      food: newPoints ? index : this.state.food,
      points: newPoints ? this.state.points + 1 : this.state.points + 0
    });
  };

  isDead = () => {
    const tail = this.state.snekArr.map(coord => `${coord.x},${coord.y}`);
    tail.pop();
    const head = `${this.state.snekArr[this.state.snekArr.length - 1].x},${
      this.state.snekArr[this.state.snekArr.length - 1].y
    }`;
    if (tail.includes(head)) {
      this.youLose();
    }
  };

  youLose = () => {
    clearInterval(this.state.timer);
    this.setState({ lost: true });
  };

  postScore = name => {
    postHighscore(name, this.state.points).then(newScore =>
      this.setState({ scores: [...this.state.scores, newScore], lost: false })
    );
  };
}

export default App;
