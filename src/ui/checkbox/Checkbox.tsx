import { FC } from 'react';
import styles from './Checkbox.module.scss';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({ checked, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={checked}
        className={styles.checkbox__input}
        onChange={handleChange}
      />
      <div className={styles.checkbox__item} />
    </label>
  );
};

export default Checkbox;
