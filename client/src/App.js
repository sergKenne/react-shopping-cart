import React, {Component} from 'react';
import store from './store';
import {Provider} from 'react-redux'
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <div id="App">
          <header>
            <div className="header">
              <a href="/">Shopping Cart</a>
              <a href="/">Admin</a>
            </div>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter />
                <Products />
              </div>
              <div className="sidebar">
                <Cart />
              </div>
            </div>
          </main>
          <footer>
            <div className="footer">Footer</div>
          </footer>
        </div>
      </Provider>
    );
  }
}

export default App;
