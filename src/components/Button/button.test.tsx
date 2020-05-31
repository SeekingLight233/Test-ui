import React from "react"
import { render, fireEvent } from "@testing-library/react"
import Button, { ButtonProps, ButtonType, ButtonSize } from "./Button"
const defaultProps = {
  onClick: jest.fn(),
}

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: "klass", //测试自定义属性
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

describe("test Button component", () => {
  it("应该渲染默认样式的button", () => {
    const wrapper = render(<Button {...defaultProps}>button</Button>)
    const element = wrapper.getByText("button")
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual("BUTTON")
    expect(element).toHaveClass("btn btn-default")
    //模拟点击后应该被调用到
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it("应该根据不同的属性渲染不同的组件", () => {
    const wrapper = render(<Button {...testProps}>button</Button>)
    const element = wrapper.getByText("button")
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass("btn-primary btn-lg klass")
  })
  it("应该渲染链接按钮", () => {
    const wrapper = render(
      <Button btnType={ButtonType.Link} href="#">
        Link
      </Button>
    )
    const element = wrapper.getByText("Link")
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual("A")
    expect(element).toHaveClass("btn btn-link")
  })
  it("应该渲染不可选按钮", () => {
    const wrapper = render(<Button {...disabledProps}>button</Button>)
    const element = wrapper.getByText("button") as HTMLButtonElement //手动设置断言
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element) //模拟点击
    expect(disabledProps.onClick).not.toBeCalled()
  })
})
