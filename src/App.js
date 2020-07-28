import React, {Component} from 'react';
import store from './store';
import {Provider} from 'react-redux'
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    };
  }

  addToCart = (product) => {
    const cartItems = [...this.state.cartItems];
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({
      cartItems,
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  removeFromCart = (product) => {

    this.setState(state => {
      return {
        cartItems: state.cartItems.filter(item => item._id !== product._id)
      }
    }, () => localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems)))
  }

  createOrder = (order) => {
    alert(order.name);
  }

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
                <Filter size={this.state.size} />
                <Products addToCart={this.addToCart} />
              </div>
              <div className="sidebar">
                <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder}/>
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
