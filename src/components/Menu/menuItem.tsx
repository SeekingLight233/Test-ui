import React from "react"
import classNames from "classnames"

export interface MenuItemProps {
  index?: number //用来和menu中的defaultindex做比较
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
  })

  return (
    <li className={classes} style={style}>
      {children}
    </li>
  )
}

export default MenuItem
