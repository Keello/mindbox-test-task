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
  //для анимации сворачивания тени
  const [collapsed, setCollapsed] = useState(false);

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

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await todoService.getTodos();
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

  const handleChangeTodos = (itemID: number, completed: boolean) => {
    const newTodos = [...todos].map((todo) => {
      if (todo.id === itemID) {
        return { ...todo, completed };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleclearCompleted = () => {
    setTodos((prev) => [...prev].map((todo) => ({ ...todo, completed: false })));
  };

  const handleAddTodo = async (value: string) => {
    const newTask = await todoService.addTodo({
      title: value,
      userId: 1,
      completed: false,
    });
    // id перезаписан т.к jsonplaceholder всегда возвращает один и тот же
    setTodos((prev) => [{ ...newTask, id: Date.now() }, ...prev]);
  };

  return (
    <Card
      stackEffect={!collapsed}
      renderBody={() => (
        <>
          <div className={styles.header}>
            <Input
              icon={<ArrowDown />}
              placeholder="What needs to be done?"
              onEnter={handleAddTodo}
            />
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
