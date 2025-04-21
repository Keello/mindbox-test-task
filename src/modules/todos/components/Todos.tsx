import { useEffect, useState } from 'react';
import styles from './Todos.module.scss';
import TodosList from './todosList/TodosList';
import TodosFilter from './todosFilter/TodosFilter';
import TodosService from '../services/TodosService';

import type { TodoFilterType, TodoType } from '../types';
import Card from '@ui/card/Card';
import Button from '@ui/button/Button';
import Input from '@ui/input/Input';

const Todos = () => {
  const todoService = new TodosService();

  const [filter, setFilter] = useState<TodoFilterType>('All');
  const [todos, setTodos] = useState<TodoType[]>([]);

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
          <Input placeholder='What needs to be done?'/>
          <TodosList todos={todos} />
          <div className={styles.actions}>
            <span>2 items left</span>
            <TodosFilter filter={filter} onChange={handleChangeFilter} />
            <Button onClick={handleclearCompleted}>Clear completed</Button>
          </div>
        </>
      )}
    />
  );
};

export default Todos;
