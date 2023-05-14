import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './client/App.jsx';
import './client/styles.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
