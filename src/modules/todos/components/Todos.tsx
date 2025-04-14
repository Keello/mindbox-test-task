import { useEffect, useState } from 'react';
import TodosList from './todosList/TodosList';
import TodosFilter from './todosFilter/TodosFilter';
import TodosService from '../services/TodosService';

import type { TodoFilterType, TodoType } from '../types';

const Todos = () => {
  const todoService = new TodosService();

  const [filter, setFilter] = useState<TodoFilterType>('All');
  const [todos, setTodos] = useState<TodoType[]>([]);

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

  return (
    <>
      <div>
        {/* <div className={`${classes.card} ${active ? classes.card_active : ''}`}>
      <div className={classes.card__body}>
        <h5 className={classes.card__title}>{activeCard[0].title}</h5>
        <p>{activeCard[0].body}</p>
        <p>What needs to be done?</p>
        <p>Тестовое задание</p>
        <p>Покрытие тестами</p>
        <p>2 items left</p>
      </div>
    </div> */}
      </div>
      <TodosList todos={todos} />
      <TodosFilter filter={filter} onChange={setFilter} />
    </>
  );
};

export default Todos;
