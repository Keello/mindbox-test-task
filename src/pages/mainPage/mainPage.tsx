import styles from './mainPage.module.scss';

import Logo from '@components/Logo/logo';
import Todos from '@modules/todos';

const MainPage = () => {
  return (
    <main className={styles.appWrapper}>
      <Logo position="center" />
      <div className={styles.content}>
        <Todos />
      </div>
    </main>
  );
};

export default MainPage;
