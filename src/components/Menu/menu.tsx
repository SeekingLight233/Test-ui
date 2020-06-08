import React, { createContext, useState } from "react"
import classNames from "classnames"

type MenuDirection = "horizontal" | "vertical"
type SelectCallback = (selectIndex: number) => void
export interface MenuProps {
  defaultIndex?: number
  className?: string
  mode?: MenuDirection
  style?: React.CSSProperties
  onSelect?: SelectCallback
}
interface IMenuContext {
  selectedIndex: number
  onSelect?: SelectCallback
}

export const MenuContext = createContext<IMenuContext>({ selectedIndex: 0 }) //默认选第一个
const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props
  const [currentActive, setActive] = useState(defaultIndex)

  const classes = classNames("test-menu", className, {
    "menu-vertical": mode == "vertical", //mode设置为vertical则样式为'menu-vertical'
  })

  const handleCick = (index: number) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    selectedIndex: currentActive ? currentActive : 0, //做一下类型兼容处理，不存在设为0
    onSelect: handleCick,
  }
  return (
    <ul className={classes} style={style}>
      {/* 将context注入到provider中 */}
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
}

export default Menu
