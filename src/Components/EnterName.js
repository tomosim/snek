import React, { Component } from "react";

class EnterName extends Component {
  state = {
    name: ""
  };
  render() {
    return (
      <div id="entername">
        <h2>ENTER YOUR NAME</h2>
        <form>
          <input
            type="text"
            id="nameinput"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <button type="button" id="scoresubmit" onClick={this.handleSubmit}>
            submit
          </button>
        </form>
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.addHighscore(this.state.name);
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };
}

export default EnterName;
