import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/index.css';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import DashboardToast from './components/utility/toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DashboardToast />
      <App />
    </Provider>
  </React.StrictMode>
);

