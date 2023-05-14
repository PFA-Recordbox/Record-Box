import { createRoot } from 'react-dom/client';
import './client/styles.scss';
import React from 'react';
import App from './client/App.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
