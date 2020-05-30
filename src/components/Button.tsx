import React from "react"
//引用classnames来更灵活的添加样式
import classNames from "classnames"

export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link",
}

//定义按钮的基本属性
interface BaseButtonProps {
  className?: string
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType //按钮类型
  children: React.ReactNode //子节点是必须要添加的
  href?: string
}

const Button: React.FC<BaseButtonProps> = (props) => {
  const { className, btnType, disabled, size, children, href } = props
  /**
   * 以 `btn` 为基础进行样式拼接
   * eg:如果设置按钮类型为Primary,则样式为 `btn btn-primary`
   */
  const classes = classNames("btn", {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    //a标签没有disabled属性，因此要手动添加不可选状态
    [`disabled`]: btnType === ButtonType.Link && disabled,
  })

  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
}

export default Button
