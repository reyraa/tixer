import React from 'react'
import FormPage from '../pages/formPage'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import HomePage from '../pages/homepage'

const App = () => {
  const pathname = window.location.pathname

  return (
    <BrowserRouter>
      {/* {pathname == '/form' ? '' : <Route component={Navbar} />} */}
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/form" component={FormPage} exact={false} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
