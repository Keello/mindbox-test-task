import { useEffect, useState } from 'react';
import TodosService from '../services/TodosService';
import TodosFilter from './todosFilter/TodosFilter';
import { TodosFilterType } from '../types';

const Todos = () => {
  const [filter, setFilter] = useState<TodosFilterType>('All');

  const fetchTodos = async () => {
    const response = await TodosService.getTodos();
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div>
        list
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
      <TodosFilter filter={filter} onChange={setFilter} />
    </>
  );
};

export default Todos;
