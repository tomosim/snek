import React, { Component } from "react";
import Grid from "./Components/Grid";
import "./App.css";

class App extends Component {
  state = { timer: null, playing: false };
  render() {
    return (
      <div className="App">
        <div id="title">snek2</div>
        <Grid
          snek={this.state.snekArr}
          playing={this.state.playing}
          play={this.play}
          stop={this.stop}
        />
      </div>
    );
  }

  play = func => {
    const timer = setInterval(func, 200);
    this.setState({ timer, playing: true });
  };

  stop = () => {
    clearInterval(this.state.timer);
    this.setState({ playing: false });
  };
}

export default App;
