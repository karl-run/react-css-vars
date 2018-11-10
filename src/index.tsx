/**
 * @class ThemeSwitcher
 */

import * as React from 'react'

type ThemeMap = {
  [key: string]: string
}

interface Props {
  theme: { [key: string]: string } | null
}

class ThemeSwitcher extends React.Component<Props> {
  componentDidMount() {
    if (this.props.theme) {
      this.setCssVariables(this.props.theme)
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.theme !== this.props.theme) {
      if (this.props.theme != null) {
        if (prevProps.theme != null) {
          this.unsetCssVariables(prevProps.theme)
        }
        this.setCssVariables(this.props.theme)
      } else {
        if (prevProps.theme != null) {
          this.unsetCssVariables(prevProps.theme)
        }
      }
    }
  }

  unsetCssVariables(variables: ThemeMap) {
    Object.keys(variables).forEach((key: string) => {
      if (document == null || document.documentElement == null) return

      document.documentElement.style.removeProperty(`--${key}`)
    })
  }

  setCssVariables(variables: ThemeMap) {
    Object.keys(variables).forEach((key: string) => {
      if (document == null || document.documentElement == null) return

      document.documentElement.style.setProperty(`--${key}`, variables[key])
    })
  }

  render() {
    return this.props.children || null
  }
}

export default ThemeSwitcher
