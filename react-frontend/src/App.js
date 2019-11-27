import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  state = {
    authors: []
  }

  // runs before rendering
  componentDidMount() {
    this.makeApiCalls();
  }

  // function
  makeApiCalls = () => {
    axios.get('http://localhost:3000/authors')
      .then(response => {
        this.setState({ authors: response.data });
      })
  }
  render() {
    console.log(this.state.authors)
    return (
      <div className="App">
        <h1>Hello Authors</h1>
      </div>
    );
  }
}
