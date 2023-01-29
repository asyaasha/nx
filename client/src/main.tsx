import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { ticketsApi } from './app/services/ticketsApi';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({
  reducer: {
    [ticketsApi.reducerPath]: ticketsApi.reducer
  },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ticketsApi.middleware),
  devTools: process.env['NODE_ENV'] !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
