import React, { createContext, useState } from "react"
import classNames from "classnames"
import MenuItem, { MenuItemProps } from "./menuItem"

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
  mode?: MenuDirection
}

export const MenuContext = createContext<IMenuContext>({ selectedIndex: 0 }) //默认选第一个
const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props
  const [currentActive, setActive] = useState(defaultIndex)

  const classes = classNames("test-menu", className, {
    "menu-vertical": mode === "vertical", //mode设置为vertical则样式为'menu-vertical'
    "menu-horizontal": mode !== "vertical",
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
    mode,
  }
  //渲染Child
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >
      const { displayName } = childElement.type
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        //将index混入属性到childElement中，自动为每一个Item项生成索引
        return React.cloneElement(childElement, { index })
      } else {
        console.error("警告:Menu中的组件必须为MenuItem类型!!!")
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      {/* 将context注入到provider中 */}
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
}
//包装显示名称
MenuItem.displayName = "MenuItem"
export default Menu
