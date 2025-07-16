import React, { FC, InputHTMLAttributes, useState } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  placeholder?: string;
  onEnter?: (value: string) => void;
}

const Input: FC<InputProps> = ({ icon, placeholder = 'Type here...', onEnter, ...props }) => {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter(value);
      setValue('');
    }
  };

  return (
    <div className={styles.wrapper}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <input
        placeholder={placeholder}
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </div>
  );
};

export default Input;
