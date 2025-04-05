import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { ChakraProvider, theme } from '@chakra-ui/react'


ReactDOM.render(
  <Provider store={store}>
 
  <App />
  
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can chađinge
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


