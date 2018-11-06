import React, { PureComponent } from "react";

class Grid extends PureComponent {
  state = { gridArr: [] };

  componentDidMount() {
    const gridArr = [];
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        gridArr.push(<div className={`grid-cell`} id="" key={`${x},${y}`} />);
      }
    }

    this.setState({
      gridArr
    });
  }

  render() {
    return <div id="grid">{this.state.gridArr}</div>;
  }
}

export default Grid;
