import React, {
  createContext,
  useState,
  useContext,
  ReactHTMLElement,
  FunctionComponentElement,
} from "react"
import classNames from "classnames"
import { MenuContext } from "./menu"
import { MenuItemProps } from "./menuItem"

export interface SubMenuProps {
  index?: number
  title: string
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext)
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.selectedIndex === index,
  })

  //渲染下拉菜单中的内容
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === "MenuItem") {
        return childElement
      } else {
        console.error("警告:Menu中的组件必须为MenuItem类型!!!")
      }
    })
    return <ul className="test-submenu">{childrenComponent}</ul>
  }

  return (
    <li key={index} className={classes}>
      <div className="submenu-title">{title}</div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = "SubMenu"
export default SubMenu
