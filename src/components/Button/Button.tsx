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
//交叉类型可以使得一个类型变量同时拥有多个属性，逻辑上是并，不是交
type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>
//Partial是一个工具类型，可以将属性设置为可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    btnType,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props
  /**
   * 以 `btn` 为基础进行样式拼接
   * eg:如果设置按钮类型为Primary,则样式为 `btn btn-primary`
   */
  const classes = classNames("btn", className, {
    //允许用户自定义classname
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    //a标签没有disabled属性，因此要手动添加不可选状态
    [`disabled`]: btnType === ButtonType.Link && disabled,
  })

  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
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
