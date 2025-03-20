import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals.js';
import ReactDOM, { createRoot } from 'react-dom/client';
import MainApp, { AppFunc } from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './reduxToolkit/store.ts';
import { HashRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store)

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)

  root.render(
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppFunc />
        </PersistGate>
      </Provider>
    </HashRouter>

  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  )
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(

//   <MainApp /> 
// );

