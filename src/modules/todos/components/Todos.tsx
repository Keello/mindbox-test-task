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
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'All':
        return todo;
      case 'Active':
        return todo.completed === false;
      case 'Completed':
        return todo.completed === true;
      default:
        return todo;
    }
  });

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
      const response = await todoService.getTodos(5);
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

  const handleChangeTodos = (todos: TodoType[]) => {
    setTodos(todos);
  };

  const handleclearCompleted = () => {
    setTodos((prev) => [...prev].map((todo) => ({ ...todo, completed: false })));
  };

  return (
    <Card
      stackEffect={!collapsed}
      renderBody={() => (
        <>
          <div className={styles.header}>
            <Input icon={<ArrowDown />} placeholder="What needs to be done?" />
          </div>
          <TodosList todos={filteredTodos} onChange={handleChangeTodos} />
          <div className={styles.actions}>
            <span className={styles.actions__info}>
              {activeTodosCount > 0 ? `${activeTodosCount} items left` : 'all tasks completed'}
            </span>
            <div className={styles.actions__filter}>
              <TodosFilter filter={filter} onChange={handleChangeFilter} />
            </div>
            <div className={styles.actions__btn}>
              <Button onClick={handleclearCompleted}>Clear completed</Button>
            </div>
          </div>
        </>
      )}
    />
  );
};

export default Todos;
