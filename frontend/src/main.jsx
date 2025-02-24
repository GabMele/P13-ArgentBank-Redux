// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';  // Import Provider from 'react-redux'
import { store } from '@/store/store.js';  // Import the Redux store
import './styles/global.scss';
import App from '@/App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* Wrap App with Redux Provider */}
      <App />
    </Provider>
  </StrictMode>
);
