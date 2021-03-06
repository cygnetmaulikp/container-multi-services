import React from "react";
import axios from "axios";

class Fib extends React.Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ""
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  fetchValues = async () => {
    try {
      const { data } = await axios.get("/api/values/current");
      this.setState({ values: data });
    } catch (error) {
      this.setState({ values: [] });
    }
  };

  fetchIndexes = async () => {
    try {
      const { data } = await axios.get("/api/values/all");
      if (Array.isArray(data)) {
        this.setState({ seenIndexes: data });
      }
    } catch (error) {
      this.setState({ seenIndexes: [] });
    }
  };

  renderSeenIndexes = () => {
    if (
      Array.isArray(this.state.seenIndexes) &&
      this.state.seenIndexes &&
      this.state.seenIndexes.length
    ) {
      return this.state.seenIndexes.map(({ number }) => number).join(",");
    }
    return [];
  };

  renderValues = () => {
    const entries = [];
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }
    return entries;
  };

  onSubmit = async e => {
    e.preventDefault();

    await axios.post("/api/values", {
      index: this.state.index
    });

    this.setState({ index: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={e => this.setState({ index: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}
        <h3>Calculated values:</h3>

        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
