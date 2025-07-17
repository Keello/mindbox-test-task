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
import Loader from '@ui/loader/Loader';
import ChangeHeightMotion from '@hoc/animations/ChangeHeightMotion';

//TODO сделать плавное изменение высоты Card
const Todos = () => {
  const todoService = new TodosService();
  //для анимации сворачивания тени
  const [collapsed, setCollapsed] = useState(false);

  //сколько мс показывать сообщение об ошибке в запросе
  const SHOW_ERRORS_TIMEOUT = 3000;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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

  // изменяет статус у todo
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
    try {
      setIsLoading(true);
      const newTask = await todoService.addTodo({
        title: value,
        userId: 1,
        completed: false,
      });
      // id перезаписан т.к jsonplaceholder всегда возвращает один и тот же
      setTodos((prev) => [{ ...newTask, id: Date.now() }, ...prev]);
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'message' in error &&
        typeof error.message === 'string'
      ) {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage('');
        }, SHOW_ERRORS_TIMEOUT);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async (todoID: number) => {
    try {
      setIsLoading(true);
      const isDeleted = await todoService.deleteTodo(todoID);
      if (isDeleted) {
        setTodos((prev) => prev.filter((item) => item.id !== todoID));
      }
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'message' in error &&
        typeof error.message === 'string'
      ) {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage('');
        }, SHOW_ERRORS_TIMEOUT);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      stackEffect={!collapsed}
      renderBody={() => (
        <>
          {isLoading && <Loader type="fluid" />}
          <div className={styles.header}>
            <Input
              icon={<ArrowDown />}
              placeholder="What needs to be done?"
              onEnter={handleAddTodo}
            />
            <span className={styles.errorWrapper}>{errorMessage}</span>
          </div>
          <ChangeHeightMotion reanimate={filteredTodos} easeWithSpring={false} duration={0.2}>
            <TodosList
              todos={filteredTodos}
              onChangeItem={handleChangeTodos}
              onDeleteItem={handleDeleteTodo}
            />
          </ChangeHeightMotion>
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
