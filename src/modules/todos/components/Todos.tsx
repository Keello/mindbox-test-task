import { useEffect, useState } from 'react';
import styles from './Todos.module.scss';
import TodosList from './todosList/TodosList';
import TodosFilter from './todosFilter/TodosFilter';
import Card from '@ui/card/Card';
import Button from '@ui/button/Button';
import Input from '@ui/input/Input';

import type { TodoFilterType, TodoType } from '../types';
import TodosService from '../services/TodosService';
import ArrowDown from '@ui/icons/ArrowDown';

const Todos = () => {
  const todoService = new TodosService();

  const [filter, setFilter] = useState<TodoFilterType>('All');
  const [todos, setTodos] = useState<TodoType[]>([]);

  const activeTodosCount = todos.reduce((res, cur) => {
    if (cur.completed) {
      return res;
    }
    return res + 1;
  }, 0);

  const [collapsed, setCollapsed] = useState(false);

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
      setCollapsed(true);
      setFilter(newFilter);

      setTimeout(() => {
        setCollapsed(false);
      }, 200);
    }
  };

  const handleclearCompleted = () => {
    console.log('clear');
  };

  return (
    <Card
      stackEffect={!collapsed}
      renderBody={() => (
        <>
          <div className={styles.header}>
            <Input icon={<ArrowDown />} placeholder="What needs to be done?" />
          </div>
          <TodosList todos={todos} />
          <div className={styles.actions}>
            <span>{activeTodosCount} items left</span>
            <TodosFilter filter={filter} onChange={handleChangeFilter} />
            <Button onClick={handleclearCompleted}>Clear completed</Button>
          </div>
        </>
      )}
    />
  );
};

export default Todos;
