import React from "react"
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react"

import Menu, { MenuProps } from "./menu"
import MenuItem from "./menuItem"

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test",
}
const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: "vertical",
}
//创建函数用来渲染不同的组件
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
    </Menu>
  )
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement
describe("测试菜单组件", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId("test-menu")
    activeElement = wrapper.getByText("active")
    disabledElement = wrapper.getByText("disabled")
  })
  it("应该渲染正确的菜单", () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass("test-menu test")
    expect(menuElement.getElementsByTagName("li").length).toBe(3)
    expect(activeElement).toHaveClass("menu-item is-active")
    expect(disabledElement).toHaveClass("menu-item is-disabled")
  })
  it("点击选项应该改变状态并且能够正确的触发回调", () => {
    const thirdItem = wrapper.getByText("xyz")
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass("is-active")
    //切换点击元素
    expect(activeElement).not.toHaveClass("is-active")
    expect(testProps.onSelect).toHaveBeenCalledWith(2)

    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass("is-active")
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  it("应该渲染垂直模式当模式设置为垂直时", () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId("test-menu")
    expect(menuElement).toHaveClass("menu-vertical")
  })
})
