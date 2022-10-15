import React from 'react';
import { render } from 'react-dom';
import { App } from './components/app';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root'); // <- This is the //correct method call for React version 17

render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    root
);
