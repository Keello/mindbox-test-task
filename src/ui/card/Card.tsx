import { FC } from 'react';
import styles from './Card.module.scss';

interface CardProps {
  renderBody: () => React.ReactNode;
  stackEffect?: boolean;
}

const Card: FC<CardProps> = ({ renderBody, stackEffect }) => {
  const cardClassList = styles.card + (stackEffect ? ' ' + styles.card_stack : '');

  return (
    <div className={styles.container}>
      <div className={cardClassList}>{renderBody()}</div>
    </div>
  );
};

export default Card;
