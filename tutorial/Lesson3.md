## Welcome to Lesson 2

### Introduction
React JS is a popular frontend JS framework. It is declarative and component based - making it easier to rewrite code as code is modularized.

### Setting up create-react-app project
Let's run this command to set up a project in React
```
npx create-react-app coffeeblog-frontend
```

#### React Structure
| File/Folder | Purpose |
| - | - |
| src/ | Contains the `App.js` and `index.js`|
| package.json | Contains npm package requirements for project | 
| public/| Contains static files for production |
| package.json| Contains npm packages |

`index.js` - the code that lies here just tells the ReactDOM to render the component called `<App />`. Hence, we'll be working more in `App.js`

Let's start the dev server. Run
```
npm start
```

You should see the spinning logo at localhost:3000. 

Open up `src/App.js` and add your name under the image tag. You should see your name appear on the dev server! 

### What we're going to achieve
1. Learn about React state and lifecycle methods
2. Make an API call to the rails backend to get a list of all authors
3. Display the result 

### React Lifecycles
A react lifecycle represents the process and timeline for each component, from initialization to mounting to rendering and unmounting.

For the point of the tutorial, let's just simplify to knowing that we will make our API calls in the `componentDidMount()` lifecycle stage/method. This means that the API calls will be made before the rendering occurs. See sample code below:

```jsx
export default class App extends React.Component => {
  // define initial value of state
  state = {
    counter: 0
  }

  // runs before rendering
  componentDidMount() {
    this.makeApiCalls();
  }

  // function
  makeApiCalls = () => {
    // fetch(...)
  }

  // render function - a must
  // returns only one child
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <p>Counter value is {this.state.counter}
        // reference state variables using this.state
      </div>
    )
  }
}
```

### Making API calls
Let's install a helpful npm package that will help simplify our api calls.
```
npm install axios --save
```
Tip: `--save` saves the dependency in `package.json`

We have to import it before using it. 

```jsx
// src/App.js
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
    axios.get('localhost:3000/authors')
      .then(response => {
        this.setState({ authors: response.data });
      })
  }

  render() {
    return (...)
  }
}
```


### References
1. [React State and Life cycles](
https://outline.com/LnTXGC)