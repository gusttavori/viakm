import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Carrega variáveis globais, reset e paleta Dark Premium
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);