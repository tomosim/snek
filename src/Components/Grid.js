import React, { PureComponent } from "react";

class Grid extends PureComponent {
  state = {
    gridArr: [],
    snekArr: [{ x: 9, y: 9 }]
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
    this.setState({
      gridArr
    });
  }

  render() {
    return (
      <div id="grid">
        {this.state.gridArr}
        {this.props.playing || (
          <button id="start" onClick={() => this.props.play(this.moveSnek)}>
            START
          </button>
        )}
      </div>
    );
  }

  moveSnek = (direction = "right") => {
    const newSnekArr = [...this.state.snekArr];
    newSnekArr.shift();

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

    this.setState({
      snekArr: newSnekArr,
      gridArr
    });
  };
}

export default Grid;
