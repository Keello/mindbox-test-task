import { createRoot } from 'react-dom/client';
import 'normalize.css';
import './styles/_fonts.scss';
import './styles/index.scss';

import App from './components/App.tsx';

createRoot(document.getElementById('root')!).render(<App />);
