import React, { Component } from 'react'

import ThemeSwitcher from 'react-css-vars'

const myFirstTheme = {
  myBackground: 'palevioletred',
  myColor: 'purple',
  myAccent: 'darkred',
}

const mySecondTheme = {
  myBackground: 'red',
  myColor: 'yellow',
  myAccent: 'blue',
}

const themes = [myFirstTheme, mySecondTheme]

export default class App extends Component {
  state = {
    themeIndex: null,
  }

  handleToggleTheme = themeIndex => {
    this.setState({ themeIndex })
  }

  render() {
    const { themeIndex } = this.state

    return (
      <ThemeSwitcher theme={themeIndex != null ? themes[themeIndex] : null}>
        <div className="exampleText">
          <div>
            Hello I am example, <span>colored</span> using css variables.
          </div>
          <div>
            <button onClick={() => this.handleToggleTheme(null)}>Reset</button>
            <button onClick={() => this.handleToggleTheme(0)}>Theme 1</button>
            <button onClick={() => this.handleToggleTheme(1)}>Theme 2</button>
          </div>
          <a href="https://github.com/karl-run/react-css-vars">Source</a>
        </div>
      </ThemeSwitcher>
    )
  }
}
