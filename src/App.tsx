import React from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import Menu from "./components/Menu/menu"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fas } from "@fortawesome/free-solid-svg-icons" //导入所有图标
import MenuItem from "./components/Menu/menuItem"
import SubMenu from "./components/Menu/subMenu"
import Icon from "./components/Icon"

library.add(fas)
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>this is a h1</h1>
        <Icon icon="arrow-alt-circle-up" theme="primary" size="10x"></Icon>
        <code>const a = "2333"</code>
        <Menu
          defaultIndex="0"
          onSelect={(index) => {
            alert(index)
          }}
          defaultOpenSubMenus={["0"]}
          mode="vertical"
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
