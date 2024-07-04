import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import { createRoot } from 'react-dom/client';

import './services';
import { Provider } from 'react-redux';
import { ConfigProvider } from './contexts/ConfigContext';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { StateContextProvider } from './contexts/MainContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ConfigProvider>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </ConfigProvider>
  </Provider>
);

reportWebVitals();
