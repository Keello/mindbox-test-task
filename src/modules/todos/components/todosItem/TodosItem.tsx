import { FC } from 'react';
import styles from './TodosItem.module.scss';
import Checkbox from '@ui/checkbox/Checkbox';
import Delete from '@ui/icons/Delete';

interface TodosItemProps {
  text: string;
  completed: boolean;
  onChange: (completed: boolean) => void;
  onDelete: () => void;
}

const TodosItem: FC<TodosItemProps> = ({ text, completed, onChange, onDelete }) => {
  return (
    <li className={`${styles.item} ${completed ? styles.item_completed : ''}`}>
      <Checkbox checked={completed} onChange={onChange} />
      <div className={styles.item__body}>
        <span>{text}</span>
        <span className={styles.icon} onClick={onDelete}>
          <Delete />
        </span>
      </div>
    </li>
  );
};

export default TodosItem;
