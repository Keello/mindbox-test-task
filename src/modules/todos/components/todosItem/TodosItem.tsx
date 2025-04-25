import { FC } from 'react';
import styles from './TodosItem.module.scss';
import Checkbox from '@ui/checkbox/Checkbox';

interface TodosItemProps {
  text: string;
  completed: boolean;
}

const TodosItem: FC<TodosItemProps> = ({ text, completed }) => {
  return (
    <li className={`${styles.item} ${completed ? styles.item_completed : ''}`}>
      <Checkbox
        checked={completed}
        onChange={(checked) => {
          console.log(checked);
        }}
      />
      <span>{text}</span>
    </li>
  );
};

export default TodosItem;
