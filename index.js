import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './client/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './client/styles.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)