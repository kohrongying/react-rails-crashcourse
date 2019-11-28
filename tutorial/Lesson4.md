## Welcome to Lesson 4

### Introduction
Here we're going to learn about an important concept - props. And how to write some jsx!

### Display the data

A simple way to display the data is to use the ordered list html tag `<ol></ol>`

Let's complete the render function of the App component.

```jsx
render() {
  return (
    <h1>Authors List</h1>
    <ol>
      {this.state.authors.map(author => {
        return <li>{author.name}</li>
      })}
    </ol>
  )
}
```

Uh oh, another error that says `Parsing error: Adjacent JSX elements must be wrapped in an enclosing tag`. 

This just means that React was unable to parse the file as the jsx was not in an enclosing tag. It also just means, when you return, you should only return ONE child. 

Easy! Let's just wrap the `<h1>` and `<ol>` in a `<div>`.

If you open the developer's console on the browser, you'll see another red prompt that says `Each child in a list should have a unique "key" prop`.

React is complaining because when we map across the authors list we are return a `<li>` component that is not unique. The solution is simple - add a `key` prop. Like this - 
```jsx
<ol>
  {this.state.authors.map(author => (
    <li key={author.id}>
      {author.name}
    </li>
  )}
</ol>
```

Tip: Using the brackets is a way of directly returning the component. So you don't have to type `{ and return }` after mapping.

And the key is a prop. 

### Passing data as props
So one last important concept for React, is passing data as props from parent to child.

```jsx
// Parent.js
<div>
  <Child age={this.state.childAge}>
</div>

// Child.js
<div>
  My age is {this.props.age}
</div>
```

As you know, React is component based. That means, there'll be many components wrapping around many other components. Hence, there's a need for data to be passed down from parent to child. This is through props. 

The child's age is passed down from parent to child. The child references the age value through its props.

Functions can also be passed down from parent to child.

#### Passing Functions as Props

First, let's understand how text fields work
```jsx
// App.js

state = {
  authors: [],
  authorName: "CoffeeLover"
}

render() {
  return (
    <div>
    ...
    <input
      value={this.state.authorName}
    />
    </div>
  )
}
```

Try it out! You should be able to see a textbox with the words "CoffeeLover" inside. However, you can type or edit the words even though its a text input. 

This is because we did not specify an onChange handler (dev tools will also be complainin').

Let's do that first!


``` jsx
// Add this function before render 
handleChange = event => {
  this.setState({
    authorName: event.target.value
  })
}
```

And add an event handler on `<input />`
```jsx
<input
  value={this.state.authorName}
  onChange={this.handleChange}
/>
```

Tada! Save and now you should be ablet o type freely. What we did was to pass the handleChange method that we defined into the input component through the `onChange` prop.

Let's look at the `onChange` function: 
It takes an event parameter and we're updating the state of our `authorName` state using `event.target.value`.

When we type in the input, an event is triggered/fired and each key down is an event. The result of what we type can be retrieved from `event.target.value`.

![mutate state](https://www.freecodecamp.org/news/content/images/2019/10/o60oxupyz8cfce0cknvz.png)

Another point to note is also: 
```jsx
✓✓✓
this.setState({ 
  authorName: "newValue"
})

✕✕✕
this.state.authorName = "newValue"
```

The only way to safely update state (or mutate) is to use `setState`. Calling `setState` will always trigger a re-render. Directly mutating it will not guarantee the correct value is updated.

### Conclusion
Yay we've come to the end!

1. State and Props
2. Using set state
3. Passing data and functions through props

A great big thank you for staying till the very end. 

![Thank you](https://media.giphy.com/media/IcGkqdUmYLFGE/giphy.gif)

### References
1. [React State and Life cycles](
https://outline.com/LnTXGC)
2. [CORS error](https://medium.com/@Nicholson85/handling-cors-issues-in-your-rails-api-120dfbcb8a24)
3. [Javascript mapping](https://www.w3schools.com/jsref/jsref_map.asp)
4. [Mutating state](https://dev.to/torianne02/why-do-we-use-this-setstate-432o)