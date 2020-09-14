import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import { ReactQueryDevtools } from "react-query-devtools";
import { BrowserRouter as Router, withRouter } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

import * as serviceWorker from "./serviceWorker";

const AppConfig = () => {
  return (
    <div>
      <Router>
        <App />
      </Router>
      {
        process.env.REACT_APP_APPLICATION_ENV === "dev" &&
          <ReactQueryDevtools initialIsOpen={false} />
      }
    </div>
  );
};

ReactDOM.render(
  <AppConfig />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
