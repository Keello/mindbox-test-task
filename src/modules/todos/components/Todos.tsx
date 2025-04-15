import { useEffect, useState } from 'react';
import styles from './Todos.module.scss';
import TodosList from './todosList/TodosList';
import TodosFilter from './todosFilter/TodosFilter';
import TodosService from '../services/TodosService';

import type { TodoFilterType, TodoType } from '../types';

const Todos = () => {
  const todoService = new TodosService();

  const [filter, setFilter] = useState<TodoFilterType>('All');
  const [todos, setTodos] = useState<TodoType[]>([]);

  const [active, setActive] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await todoService.getTodos(15);
      if (response) {
        setTodos(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeFilter = (newFilter: TodoFilterType) => {
    if (newFilter !== filter) {
      setActive(true);
      setFilter(newFilter);

      setTimeout(() => {
        setActive(false);
      }, 200);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${active ? styles.card_active : ''}`}>
        <TodosList todos={todos} />
        <TodosFilter filter={filter} onChange={handleChangeFilter} />
      </div>
    </div>
  );
};

export default Todos;
