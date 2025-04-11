/**
 * @description Entry point of the React application. Sets up React root, Redux provider, 
 * global styles, and environment-based debug logging.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/store/store.js';
import './styles/global.scss';
import App from '@/App.jsx';


// Disable debug logs in production
if (import.meta.env.MODE == 'production') {
  console.debug = function() {};
}

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
