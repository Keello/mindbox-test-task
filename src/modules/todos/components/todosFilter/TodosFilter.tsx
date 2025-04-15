import { FC } from 'react';
import styles from './TodosFilter.module.scss';
import type { TodoFilterType } from '../../types';
import Button from '@ui/button/Button';

interface TodosFilterProps {
  filter: TodoFilterType;
  onChange: (filter: TodoFilterType) => void;
}

const TodosFilter: FC<TodosFilterProps> = ({ filter, onChange }) => {
  return (
    <div className={styles.filters}>
      <Button
        active={filter === 'All'}
        onClick={() => {
          onChange('All');
        }}
      >
        All
      </Button>
      <Button
        active={filter === 'Active'}
        onClick={() => {
          onChange('Active');
        }}
      >
        Active
      </Button>
      <Button
        active={filter === 'Completed'}
        onClick={() => {
          onChange('Completed');
        }}
      >
        Completed
      </Button>
    </div>
  );
};

export default TodosFilter;
