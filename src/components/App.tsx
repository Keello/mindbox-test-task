import { useState } from 'react';
import classes from './App.module.scss';

const data = [
  {
    status: 'All',
    title: 'Lorem Ipsum All',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem 1111',
  },
  {
    status: 'Active',
    title: 'Lorem Ipsum Active',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem 2222',
  },
  {
    status: 'Completed',
    title: 'Lorem Ipsum Completed',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem 333',
  },
];

type StatusType = 'All' | 'Active' | 'Completed';

const App = () => {
  const [status, setStatus] = useState<StatusType>('All');
  const [active, setActive] = useState(false);

  const changeStatusHandler = (status: StatusType) => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
      setStatus(status);
    }, 200);
  };

  const activeCard = data.filter((item) => item.status === status);

  return (
    <div className={classes.container}>
      <div className={`${classes.card} ${active ? classes.card_active : ''}`}>
        <div className={classes.card__body}>
          <h5 className={classes.card__title}>{activeCard[0].title}</h5>
          <p>{activeCard[0].body}</p>
          <p>What needs to be done?</p>
          <p>Тестовое задание</p>
          <p>Покрытие тестами</p>
          <p>2 items left</p>
          <button
            onClick={() => {
              changeStatusHandler('All');
            }}
          >
            All
          </button>
          <button
            onClick={() => {
              changeStatusHandler('Active');
            }}
          >
            Active
          </button>
          <button
            onClick={() => {
              changeStatusHandler('Completed');
            }}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
