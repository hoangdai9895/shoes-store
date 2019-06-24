import React, { Component } from "react";
import "./App.css";
import axios from "axios";
class App extends Component {
  state = {
    user: []
  };
  componentDidMount() {
    axios.get("/test").then(res => this.setState({ user: res.data }));
  }

  render() {
    return (
      <div>
        user:
        {this.state.user &&
          this.state.user.map(item => <span key={item._id}>{item.date}</span>)}
      </div>
    );
  }
}

export default App;
