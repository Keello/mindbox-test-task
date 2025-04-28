import { FC } from 'react';
import styles from './TodosList.module.scss';
import type { TodoType } from '../../types';
import TodosItem from '../todosItem/TodosItem';

interface TodosListProps {
  todos: TodoType[];
  onChange: (todos: TodoType[]) => void;
}

const TodosList: FC<TodosListProps> = ({ todos, onChange }) => {
  const handleChangeItem = (itemID: number, completed: boolean) => { 
    const newTodos = [...todos].map((todo) => {
      if (todo.id === itemID) {
        return { ...todo, completed };
      }
      return todo;
    });

    onChange(newTodos);
  };

  if (todos?.length === 0) {
    return <p>Нет данных!</p>;
  }
  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodosItem
          key={todo.id}
          text={todo.title}
          completed={todo.completed}
          onChange={(completed) => {
            handleChangeItem(todo.id, completed);
          }}
        />
      ))}
    </ul>
  );
};

export default TodosList;
