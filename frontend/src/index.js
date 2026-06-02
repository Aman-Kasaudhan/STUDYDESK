import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';

import Study from './MegaFrontend/Study';

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./MegaFrontend/reducer/store";
import { logout, setToken } from './MegaFrontend/slice/authSlice';
import { clearUser, setUser } from './MegaFrontend/slice/profileSlice';
import axios from 'axios';

document.title = "StudyDesk | Smart Study Platform";

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

if (storedUser && storedToken) {
  store.dispatch(setUser(JSON.parse(storedUser)));
  store.dispatch(setToken(storedToken));
}

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      store.dispatch(logout());
      store.dispatch(clearUser());
      persistor.purge();
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Study />
        <ToastContainer />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

reportWebVitals();
