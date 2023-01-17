import React from 'react';
import { createRoot } from 'react-dom/client';
import {Provider} from "react-redux";

// own modules
import App from './app/App';
import store from "./store/index";

// styles
import "./index.css";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
);
