import { FC } from 'react';
import styles from './TodosFilter.module.scss';
import { TodosFilterType } from '../../types';

interface TodosFilterProps {
  filter: TodosFilterType;
  onChange: (filter: TodosFilterType) => void;
}

const TodosFilter: FC<TodosFilterProps> = ({ filter, onChange }) => {
  return (
    <div>
      <button
        className={`${styles.button}`}
        onClick={() => {
          onChange('All');
        }}
      >
        All
      </button>
      <button
        className={`${styles.button} ${styles.button_active}`}
        onClick={() => {
          onChange('Active');
        }}
      >
        Active
      </button>
      <button
        className={`${styles.button}`}
        onClick={() => {
          onChange('Completed');
        }}
      >
        Completed
      </button>
    </div>
  );
};

export default TodosFilter;
