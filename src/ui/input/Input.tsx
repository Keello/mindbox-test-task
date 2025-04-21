import React, { FC } from 'react';
import styles from './Input.module.scss';

interface InputProps {
  placeholder?: string;
}

const Input: FC<InputProps> = ({ placeholder = 'Type here...', ...props }) => {
  return <input placeholder={placeholder} {...props} className={styles.input} />;
};

export default Input;
