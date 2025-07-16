import { FC } from 'react';
import styles from './TodosList.module.scss';
import type { TodoType } from '../../types';
import TodosItem from '../todosItem/TodosItem';

interface TodosListProps {
  todos: TodoType[];
  onChangeItem: (todoID: number, isCompleted: boolean) => void;
  onDeleteItem: (todoID: number) => void;
}

const TodosList: FC<TodosListProps> = ({ todos, onChangeItem, onDeleteItem }) => {
  if (todos?.length === 0) {
    return <p className={styles.list__empty}>Нет данных!</p>;
  }
  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodosItem
          key={todo.id}
          text={todo.title}
          completed={todo.completed}
          onChange={(completed) => {
            onChangeItem(todo.id, completed);
          }}
          onDelete={() => {
            onDeleteItem(todo.id);
          }}
        />
      ))}
    </ul>
  );
};

export default TodosList;
