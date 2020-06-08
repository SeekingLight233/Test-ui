import React from "react"
import classNames from "classnames"

type MenuDirection = "horizontal" | "vertical"
export interface MenuProps {
  defaultIndex?: number
  className?: string
  mode?: MenuDirection
  style?: React.CSSProperties
  onSelect?: (selectIndex: number) => void
}

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex } = props

  const classes = classNames("test-menu", className, {
    "menu-vertical": mode == "vertical", //mode设置为vertical则样式为'menu-vertical'
  })
  return (
    <ul className={classes} style={style}>
      {children}
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
}

export default Menu
