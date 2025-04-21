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
    <ul className={styles.filters}>
      <li>
        <Button
          active={filter === 'All'}
          onClick={() => {
            onChange('All');
          }}
        >
          All
        </Button>
      </li>
      <li>
        <Button
          active={filter === 'Active'}
          onClick={() => {
            onChange('Active');
          }}
        >
          Active
        </Button>
      </li>
      <li>
        <Button
          active={filter === 'Completed'}
          onClick={() => {
            onChange('Completed');
          }}
        >
          Completed
        </Button>
      </li>
    </ul>
  );
};

export default TodosFilter;
