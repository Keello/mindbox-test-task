import { FC, PropsWithChildren } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, className, active, ...props }) => {
  let classList = styles.button;
  if (active) {
    classList += ` ${styles.button_active}`;
  }

  return (
    <button className={classList} {...props}>
      {children}
    </button>
  );
};

export default Button;
