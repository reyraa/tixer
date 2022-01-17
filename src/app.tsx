import React from 'react';
import { Provider } from 'react-redux';
import {
  Route, Switch, StaticRouter, BrowserRouter,
} from 'react-router-dom';
import routes from './routes';
import Header from './components/header';
import Footer from './components/footer';
import './components/variables.css';
import './components/globals.css';
import './components/type.css';
import './components/carousel.css';

const App = ({
  store, url, context, isClient,
}) => {
  const Router = isClient ? BrowserRouter : StaticRouter;
  return (
    <Provider store={store}>
      <Router location={url} context={context}>
        <Route component={Header} />
        <Switch>
          {routes.map((route, index) => (
            <Route key={`route${index}`} {...route} />
          ))}
        </Switch>
        <Route component={Footer} />
      </Router>
    </Provider>
  );
};

export default App;
