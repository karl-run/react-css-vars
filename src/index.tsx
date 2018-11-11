/**
 * @class ThemeSwitcher
 */

import * as React from 'react'

type ThemeMap = {
  [key: string]: string
}

interface Props {
  elementId?: string
  theme: { [key: string]: string } | null
}

class ThemeSwitcher extends React.Component<Props> {
  static defaultProps = {
    elementId: null,
  }

  optionalElement: HTMLElement | null = null

  componentDidMount() {
    if (this.props.elementId != null) {
      this.optionalElement = document.getElementById(this.props.elementId)
    }

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
    const element = this.optionalElement || document.documentElement

    Object.keys(variables).forEach((key: string) => {
      if (element == null) return

      element.style.removeProperty(`--${key}`)
    })
  }

  setCssVariables(variables: ThemeMap) {
    const element = this.optionalElement || document.documentElement

    Object.keys(variables).forEach((key: string) => {
      if (element == null) return

      element.style.setProperty(`--${key}`, variables[key])
    })
  }

  render() {
    return this.props.children || null
  }
}

export default ThemeSwitcher
