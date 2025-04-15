import { FC } from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
  type?: 'normal' | 'fluid';
}

const Loader: FC<LoaderProps> = ({ type = 'normal' }) => {
  const loader = <div className={styles.loader} />;

  if (type === 'normal') {
    return loader;
  }

  if (type === 'fluid') {
    return <div className={styles.wrapper}>{loader}</div>;
  }
};

export default Loader;
