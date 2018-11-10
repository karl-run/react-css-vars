import * as React from 'react'
import { shallow, mount, render } from 'enzyme'

import ThemeSwitcher from '.'

describe('ThemeSwitcher', () => {
  const basicTheme = {
    variableOne: 'red',
    variableTwo: 'white',
  }

  const differentTheme = {
    variableOne: 'blue',
    variableThree: 'hotpink',
  }

  describe('render', () => {
    it('shall render children when no theme is passed', () => {
      const wrapper = shallow<ThemeSwitcher>(
        <ThemeSwitcher theme={null}>
          <div>Hello, I am children</div>
        </ThemeSwitcher>,
      )

      expect(wrapper).toContainReact(<div>Hello, I am children</div>)
    })

    it('shall render children when a theme is passed', () => {
      const wrapper = shallow<ThemeSwitcher>(
        <ThemeSwitcher theme={basicTheme}>
          <div>Hello, I am children</div>
        </ThemeSwitcher>,
      )

      expect(wrapper).toContainReact(<div>Hello, I am children</div>)
    })

    it('shall render null if no children are passed', () => {
      const wrapper = shallow<ThemeSwitcher>(<ThemeSwitcher theme={null} />)

      expect(wrapper).toBeEmptyRender()
    })
  })

  describe('componentDidMount', () => {
    it('shall do nothing if no theme is set on mount', () => {
      const wrapper = shallow<ThemeSwitcher>(<ThemeSwitcher theme={null} />, {
        disableLifecycleMethods: true,
      })
      const spy = jest.spyOn(wrapper.instance(), 'setCssVariables')

      wrapper.instance().componentDidMount()

      expect(spy).not.toHaveBeenCalled()
    })

    it('shall invake setCssVariables with theme prop if component mounts with theme', () => {
      const wrapper = shallow<ThemeSwitcher>(<ThemeSwitcher theme={basicTheme} />, {
        disableLifecycleMethods: true,
      })
      const spy = jest.spyOn(wrapper.instance(), 'setCssVariables')

      wrapper.instance().componentDidMount()

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(basicTheme)
    })
  })

  describe('componentDidUpdate', () => {
    // @ts-ignore
    const setSpy = jest.spyOn(document.documentElement.style, 'setProperty')

    // @ts-ignore
    const removeSpy = jest.spyOn(document.documentElement.style, 'removeProperty')

    beforeEach(() => {
      jest.resetAllMocks()
    })

    it('shall do nothing if theme is the same', () => {
      const wrapper = mount<ThemeSwitcher>(<ThemeSwitcher theme={basicTheme} />)

      // Reset invokations from mounting
      setSpy.mockReset()

      wrapper.setProps({ theme: basicTheme })

      expect(setSpy).not.toHaveBeenCalled()
    })

    it('shall unset the old theme and set the new theme when themes are different', () => {
      const wrapper = mount<ThemeSwitcher>(<ThemeSwitcher theme={basicTheme} />)

      // Reset invokations from mounting
      setSpy.mockReset()

      wrapper.setProps({ theme: differentTheme })

      expect(removeSpy).toHaveBeenCalledTimes(2)
      expect(removeSpy).toHaveBeenCalledWith('--variableOne')
      expect(removeSpy).toHaveBeenCalledWith('--variableTwo')

      expect(setSpy).toHaveBeenCalledTimes(2)
      expect(setSpy).toHaveBeenCalledWith('--variableOne', 'blue')
      expect(setSpy).toHaveBeenCalledWith('--variableThree', 'hotpink')
    })

    it('shall do unset the old theme when new theme is null', () => {
      const wrapper = mount<ThemeSwitcher>(<ThemeSwitcher theme={differentTheme} />)

      // Reset invokations from mounting
      setSpy.mockReset()

      wrapper.setProps({ theme: null })

      expect(setSpy).toHaveBeenCalledTimes(0)

      expect(removeSpy).toHaveBeenCalledTimes(2)
      expect(removeSpy).toHaveBeenCalledWith('--variableOne')
      expect(removeSpy).toHaveBeenCalledWith('--variableThree')
    })

    it('shall only set new theme when initial theme is null', () => {
      const wrapper = mount<ThemeSwitcher>(<ThemeSwitcher theme={null} />)

      wrapper.setProps({ theme: basicTheme })

      expect(removeSpy).toHaveBeenCalledTimes(0)

      expect(setSpy).toHaveBeenCalledTimes(2)
      expect(setSpy).toHaveBeenCalledWith('--variableOne', 'red')
      expect(setSpy).toHaveBeenCalledWith('--variableTwo', 'white')
    })
  })
})
