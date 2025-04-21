import { FC } from 'react';
import classes from './Logo.module.scss';

interface LogoProps {
  position?: 'left' | 'center' | 'right';
}

const Logo: FC<LogoProps> = ({ position = 'left' }) => {
  const mainClass = 'title';
  const positionClass = mainClass + '_' + position;

  return <h1 className={`${classes[mainClass]} ${classes[positionClass]}`}>todos</h1>;
};

export default Logo;
