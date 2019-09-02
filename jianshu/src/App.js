import React,{ Component,Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter,Route } from 'react-router-dom';
import { GlobalStyle } from './style';
import { GlobalIcon } from './statics/iconfont/iconfont.js';
import store from './store';
import Detail from './pages/detail/loadable.js';
import Header from './common/header';
import Home from './pages/home';
import Login from './pages/login';

class App extends Component  {
  render(){
    return(
      <Fragment>
        <GlobalStyle/>
        <GlobalIcon />
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Header />
              <Route path='/' exact component={Home}></Route>
              <Route path='/login' exact component={Login}></Route>
              <Route path='/detail/:id' exact component={Detail}></Route>
            </div>
          </BrowserRouter>
        </Provider>
        
      </Fragment>
      
    )
  }
}

export default App;
