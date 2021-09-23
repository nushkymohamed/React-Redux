import React, { FC } from 'react';

interface ButtonProps {
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  className?: string;
  disabled?:boolean
}

const Button: FC<ButtonProps> = ({
  onClick,
  type,
  children,
  className,
  disabled,
  ...rest
}) => {
  return (
    <button
      style={disabled?{pointerEvents:'none',opacity:0.5}:{}}
      className={className || ''}
      type={type}
      onClick={onClick && onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
