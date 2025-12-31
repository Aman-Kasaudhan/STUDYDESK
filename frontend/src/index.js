import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import rootReducer from '../MegaFrontend/reducer/rootReducer';

import rootReducer from './MegaFrontend/reducer/rootReducer'



// import reportWebVitals from '../../reportWebVitals';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from 'react-redux'
// import store from './MegaFrontend/redux/store';
import Study from './MegaFrontend/Study'
import { configureStore } from '@reduxjs/toolkit';
 import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./MegaFrontend/reducer/store";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
 <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Study />
        <ToastContainer />
      </BrowserRouter>
    </PersistGate>
      </Provider>
      // {/* </React.StrictMode> */}
);

reportWebVitals();
