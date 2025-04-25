import { FC } from 'react';
import styles from './TodosList.module.scss';
import type { TodoType } from '../../types';
import TodosItem from '../todosItem/TodosItem';

interface TodosListProps {
  todos: TodoType[];
}

const TodosList: FC<TodosListProps> = ({ todos }) => {
  if (todos?.length === 0) {
    return <p>Нет данных!</p>;
  }
  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodosItem key={todo.id} text={todo.title} completed={todo.completed} />
      ))}
    </ul>
  );
};

export default TodosList;
