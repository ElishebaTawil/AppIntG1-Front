import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './Redux/store/store'; // Import your Redux store
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './Context/ShopContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ShopContextProvider>
      {/* Wrap App with Provider and pass the Redux store */}
      <Provider store={store}>
        <App />
      </Provider>
    </ShopContextProvider>
  </React.StrictMode>
);

reportWebVitals();
