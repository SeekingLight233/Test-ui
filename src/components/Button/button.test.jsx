import React from "react"
import { render } from "@testing-library/react"
import Button from "./Button"

test("first case", () => {
  const wrapper = render(<Button>button</Button>)
  const element = wrapper.queryByText("button")
  expect(element).toBeTruthy()
})
