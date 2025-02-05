import { createRoot } from 'react-dom/client';
import 'normalize.css';
import './styles/_fonts.scss';
import './styles/index.scss';

import MainPage from '@pages/mainPage/mainPage';

createRoot(document.getElementById('root')!).render(<MainPage />);
