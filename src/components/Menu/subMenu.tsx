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
import Icon from "../Icon"

export interface SubMenuProps {
  index?: string
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
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpend =
    index && context.mode === "vertical"
      ? openedSubMenus.includes(index)
      : false
  const [menuOpen, setOpen] = useState(isOpend)
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.selectedIndex === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  })

  //切换下拉菜单开关状态
  const toggle = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }
  //创建两个事件对象
  const clickEvents = context.mode === "vertical" ? { onClick: toggle } : {}
  const hoverEvents =
    context.mode === "horizontal"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
          },
        }
      : {}

  //渲染下拉菜单中的内容
  const renderChildren = () => {
    const subMenuClasses = classNames("test-submenu", {
      "menu-opened": !menuOpen,
    })

    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, { index: `${index}-${i}` })
      } else {
        console.error("警告:Menu中的组件必须为MenuItem类型!!!")
      }
    })
    return <ul className={subMenuClasses}>{childrenComponent}</ul>
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" onClick={toggle} {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = "SubMenu"
export default SubMenu
