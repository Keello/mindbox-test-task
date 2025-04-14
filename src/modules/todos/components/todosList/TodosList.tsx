import { FC } from 'react';
import type { TodoType } from '../../types';

interface TodosListProps {
  todos: TodoType[];
}

const TodosList: FC<TodosListProps> = ({ todos }) => {
  if (todos?.length === 0) {
    return <p>Нет данных!</p>;
  }
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default TodosList;
