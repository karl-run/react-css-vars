# react-css-vars [![NPM](https://img.shields.io/npm/v/react-css-vars.svg)](https://www.npmjs.com/package/react-css-vars) [![npm bundle size (minified)](https://img.shields.io/bundlephobia/minzip/react-css-vars.svg)](https://github.com/karl-run/react-css-vars)

A simple way to theme your React application using pure CSS variables.

![Example](./example.gif)

## Why?

Because CSS variables are fast. React doesn't have to lift a finger when the style changes globally.

## Can I use it?

If you support modern browsers, you can use it!

Have a look at [caniuse.com](https://caniuse.com/#feat=css-variables) to make sure.

## Install

```bash
npm install react-css-vars
```

or

```bash
yarn add react-css-vars
```

## Basic usage

Simply import `ThemeSwitcher` and use it anywhere in your application, providing it a theme map.

```jsx
import React from 'react'

import ThemeSwitcher from 'react-css-vars'

const myTheme = {
  myColor: 'red',
}

class Example extends React.Component {
  render() {
    return <ThemeSwitcher theme={myTheme} />
  }
}
```

In your CSS you can use these variables.

```css
.anyCssClass {
  color: var(--myColor);
}
```

## Switching theme

To dynamically switch themes, simply provide a different theme as the `theme`-prop.

```jsx
import React from 'react'

import ThemeSwitcher from 'react-css-vars'

const myFirstTheme = {
  myColor: 'darkslategray',
}

const coolTheme = {
  myColor: 'yellow',
}

export default class App extends Component {
  state = {
    basicTheme: true,
  }

  handleToggleTheme = () => {
    this.setState(prevState => ({ basicTheme: !prevState.basicTheme }))
  }

  render() {
    const { basicTheme } = this.state

    return (
      <ThemeSwitcher theme={basicTheme ? basicTheme : coolTheme}>
        <div>
          <div>Example</div>
          <button onClick={this.handleToggleTheme}>Change theme!</button>
        </div>
      </ThemeSwitcher>
    )
  }
}
```

This is just a basic example on how to switch themes. As long as the `theme` prop changes, the theme is going to be applied.

## Overwriting CSS variables

If you would like to have your base theme in your CSS file, and only overwrite when the theme changes this is very simple.

In your CSS, provide your variables on the `:root`-pseudo-class

```css
:root {
  --myColor: palevioletred;
}
```

Then your switcher passes in `null` to the `ThemeSwitcher` when no theme is selected.

```jsx
import React from 'react'

import ThemeSwitcher from 'react-css-vars'

// Only one theme here, the base theme is declared in the CSS-file.
const coolTheme = {
  myColor: 'yellow',
}

export default class App extends Component {
  state = {
    basicTheme: true,
  }

  handleToggleTheme = () => {
    this.setState(prevState => ({ basicTheme: !prevState.basicTheme }))
  }

  render() {
    const { basicTheme } = this.state

    return (
      <ThemeSwitcher theme={basicTheme ? null : coolTheme}>
        <div>
          <div>Example</div>
          <button onClick={this.handleToggleTheme}>Change theme!</button>
        </div>
      </ThemeSwitcher>
    )
  }
}
```

For a full working example look at the [example](https://github.com/karl-run/react-css-vars/tree/master/example) project.

## License

MIT © [karl-run](https://github.com/karl-run)
