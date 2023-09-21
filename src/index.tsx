import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App_board';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore} from 'redux';
import rootReducer from './modules/rootReducer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={createStore(rootReducer)}>
    <App />
  </Provider>
);

// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

reportWebVitals();
