/**
 * @class ThemeSwitcher
 */

import * as React from 'react'

interface Props {
  theme: { [key: string]: string } | null
}

class ThemeSwitcher extends React.Component<Props> {
  componentDidMount() {
    if (this.props.theme) {
      this.updateCssVariables(this.props.theme)
    }
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.theme !== this.props.theme && this.props.theme != null) {
      this.updateCssVariables(this.props.theme)
    }
  }

  updateCssVariables(variables: { [key: string]: string }) {
    Object.keys(variables).forEach((key: string) => {
      if (document == null || document.documentElement == null) return

      document.documentElement.style.setProperty(`--${key}`, variables[key])
    })
  }

  render() {
    if (this.props.theme == null) return null

    return this.props.children || null
  }
}

export default ThemeSwitcher
