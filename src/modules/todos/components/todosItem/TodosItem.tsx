import { FC } from 'react';
import styles from './TodosItem.module.scss';
import Checkbox from '@ui/checkbox/Checkbox';

interface TodosItemProps {
  text: string;
  completed: boolean;
  onChange: (completed: boolean) => void;
}

const TodosItem: FC<TodosItemProps> = ({ text, completed, onChange }) => {
  return (
    <li className={`${styles.item} ${completed ? styles.item_completed : ''}`}>
      <Checkbox checked={completed} onChange={onChange}/>
      <span>{text}</span>
    </li>
  );
};

export default TodosItem;
