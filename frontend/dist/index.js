import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
var rootElement = document.getElementById('root');
if (!rootElement)
    throw new Error('Failed to find the root element');
var root = ReactDOM.createRoot(rootElement);
root.render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
// Se vuoi iniziare a misurare le performance nella tua app, passa una funzione
// per loggare i risultati (per esempio: reportWebVitals(console.log))
// o invia a un endpoint di analisi. Scopri di più: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
