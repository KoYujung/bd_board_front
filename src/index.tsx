import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App_menu';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore} from 'redux';
import boardReducer from './modules/boardReducer';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = createStore(boardReducer);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>

);

reportWebVitals();
