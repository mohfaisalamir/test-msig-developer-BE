import React from 'react';
import ReactDOM from 'react-dom/client'; // Perhatikan import ini
import App from './App';
import 'bulma/css/bulma.min.css';

// Membuat root dengan createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Menggunakan root.render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
