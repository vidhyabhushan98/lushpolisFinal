import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import store from "./store";
import Modal from 'react-modal';
import {ChakraProvider} from "@chakra-ui/react";
import reportWebVitals from "./reportWebVitals";
const persistedStore = persistStore(store);

Modal.setAppElement('#root');
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <ChakraProvider>
            <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

reportWebVitals();