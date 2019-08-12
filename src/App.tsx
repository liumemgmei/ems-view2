import React from 'react';
import login from './login';
import home from './home';
import {Router, Route, Redirect, NuomiRoute} from 'nuomi';
class App extends React.Component {
  render() {
    return(
      <Router>
        <Route path='/index' {...login}/>
        <NuomiRoute pathPrefix={/^\/(home|404)/} {...home}/>
        <Redirect to='index' />
      </Router>
    );
  }
}

export default App;
