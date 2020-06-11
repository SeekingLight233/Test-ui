import React, { useContext } from "react"
import classNames from "classnames"
import { MenuContext } from "./menu"

export interface MenuItemProps {
  index?: number //用来和menu中的defaultindex做比较
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props
  const context = useContext(MenuContext)
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.selectedIndex === index, //如果index配置，则该item高亮
  })
  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === "number") {
      context.onSelect(index) //不要忘了将当前的index传给开发者自定义的函数
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

export default MenuItem
