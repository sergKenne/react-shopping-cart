import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux'
import {removeFromCart} from '../action/cartAction'


class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
      email: '',
      name: "",
      address: ""
    };
  }

  handleInput = e => {
    this.setState({
        [e.target.name] : e.target.value
    })
  }

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems
    };
    this.props.createOrder(order)
  }

  render() {
    const cartItems  = this.props.cartItems || [];
    return (
      <div>
        <div>
          {cartItems.length === 0 ? (
            <div className="cart cart-header">cart is empty</div>
          ) : (
            <div className="cart cart-header">you have {cartItems.length} in the cart</div>
          )}
        </div>
        <div className="cart">
          <Fade left cascade>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div className="cart-top">
                    <img src={item.image} alt={item.title} />
                    <div>{item.title}</div>
                  </div>
                  <div>
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count} {'  '}
                      <button className="button" onClick={() => this.props.removeFromCart(item)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        <div>
          {cartItems.length !== 0 && (
            <div className="total">
              <div>
                Total: {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
              </div>
              <button
                className="button primary"
                onClick={() => this.setState({ showCheckout: true })}>
                Proceed
              </button>
            </div>
          )}
        </div>
        <div>
          {this.state.showCheckout && (
            <Fade right cascade>
              <div className="cart">
                <form onSubmit={this.createOrder}>
                  <ul className="form-container">
                    <li>
                      <label>Email</label>
                      <input name="email" type="email" required onChange={this.handleInput} />
                    </li>
                    <li>
                      <label>Name</label>
                      <input name="name" type="text " required onChange={this.handleInput} />
                    </li>
                    <li>
                      <label>Address</label>
                      <input name="address" type="text" required onChange={this.handleInput} />
                    </li>
                    <li>
                      <button className="button primary" type="submit">Checkout</button>
                    </li>
                  </ul>
                </form>
              </div>
            </Fade>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems
});

// const mapDispatchToProps = dispatch => ({
//   addToCart: (items, prod) => dispatch(addToCart(items, prod))
// })

export default connect(mapStateToProps,{ removeFromCart })(Cart) 
