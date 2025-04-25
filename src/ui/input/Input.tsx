import { FC, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  placeholder?: string;
}

const Input: FC<InputProps> = ({ icon, placeholder = 'Type here...', ...props }) => {
  return (
    <div className={styles.wrapper}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <input placeholder={placeholder} {...props} className={styles.input} />
    </div>
  );
};

export default Input;
