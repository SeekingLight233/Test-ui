import React from "react"
import Button, { ButtonType, ButtonSize } from "./components/Button/Button"
import Menu from "./components/Menu/menu"
import MenuItem from "./components/Menu/menuItem"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>this is a h1</h1>
        <code>const a = "2333"</code>
        <Menu defaultIndex={1} mode="vertical">
          <MenuItem index={0} disabled>
            选项一
          </MenuItem>
          <MenuItem index={1}>选项二</MenuItem>
          <MenuItem index={2}>选项三</MenuItem>
        </Menu>

        <Button className="customer">hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Primary&large
        </Button>
        <Button btnType={ButtonType.Link} href="https://seekinglight.cn/">
          Link
        </Button>
        <Button btnType={ButtonType.Danger} href="https://seekinglight.cn/">
          危险
        </Button>
        <Button disabled>不可选</Button>
        <Button
          href="https://seekinglight.cn/"
          btnType={ButtonType.Link}
          disabled
        >
          不可选的链接
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
