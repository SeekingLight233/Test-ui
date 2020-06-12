import React from "react"
import Button, { ButtonType, ButtonSize } from "./components/Button/Button"
import Menu from "./components/Menu/menu"
import MenuItem from "./components/Menu/menuItem"
import SubMenu from "./components/Menu/subMenu"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>this is a h1</h1>
        <code>const a = "2333"</code>
        <Menu
          defaultIndex="0"
          mode="vertical"
          onSelect={(index) => {
            alert(index)
          }}
          defaultOpenSubMenus={["0"]}
        >
          <MenuItem disabled>选项一</MenuItem>
          <MenuItem>选项二</MenuItem>
          <SubMenu title="标题">
            <MenuItem>下拉菜单一</MenuItem>
            <MenuItem>下拉菜单二</MenuItem>
          </SubMenu>
          <MenuItem>选项三</MenuItem>
        </Menu>

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
