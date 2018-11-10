import React, { Component } from 'react'

import ThemeSwitcher from 'react-css-vars'

const myFirstTheme = {
  myBackground: 'darkslategray',
  myColor: 'white',
  myAccent: 'mediumseagreen',
}

const mySecondTheme = {
  myBackground: 'red',
  myColor: 'yellow',
  myAccent: 'blue',
}

export default class App extends Component {
  state = {
    useOtherTheme: false,
  }

  handleToggleTheme = () => {
    this.setState(prevState => ({ useOtherTheme: !prevState.useOtherTheme }))
  }

  render() {
    const { useOtherTheme } = this.state

    return (
      <ThemeSwitcher theme={useOtherTheme ? mySecondTheme : myFirstTheme}>
        <div className="exampleText">
          <div>
            Hello I am example, <span>colored</span> using css variables.
          </div>
          <button onClick={this.handleToggleTheme}>Change theme!</button>
          <a href="TODO">Source</a>
        </div>
      </ThemeSwitcher>
    )
  }
}
