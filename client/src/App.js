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
  login = e => {
    // e.preventDefault();
    // axios.get("/auth/google").then(res => console.log(res.data));
  };
  render() {
    return (
      <div>
        <a
          href="http://localhost:5000/auth/google"
          onClick={e => this.login(e)}
        >
          Login G
        </a>
      </div>
    );
  }
}

export default App;
