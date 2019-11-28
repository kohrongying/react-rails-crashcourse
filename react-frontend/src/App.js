import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  state = {
    authors: [],
    authorName: "CoffeeLover",
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

  handleChange = event => {
    this.setState({
      authorName: event.target.value
    })
  }

  render() {
    console.log(this.state.authors)
    return (
      <div>
        <h1>Authors List</h1>
        <ol>
          {this.state.authors.map(author => {
            return <li key={author.id}>{author.name}</li>
          })}
        </ol>
        <input
          value={this.state.authorName}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
