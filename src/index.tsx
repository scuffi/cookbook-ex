import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Route,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Navigation } from './components/Navigation';
import { Create } from './routes/Create';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <Navigation />
        <div>
          <Route>
            <Create />
          </Route>
          <Route path="/recipe/:id">

          </Route>
          <Route path="/create">
            <Create />
          </Route>
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
