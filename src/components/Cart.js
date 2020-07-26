import React, { Component } from 'react'
import formatCurrency from '../util';

class Cart extends Component {
    render() {
        const {cartItems} = this.props; 
        return (
            <div>
                <div>
                { cartItems.length === 0
                    ? 
                        <div className="cart cart-header">cart is empty</div>
                    :
                        <div className="cart cart-header">
                            you have {cartItems.length} in the cart
                        </div>
                }
                </div>
                <div className="cart">
                    <ul className="cart-items">
                        {cartItems.map(item => (
                            <li key={item._id} >
                                <div className="cart-top">
                                    <img src={item.image} alt={item.title} />
                                    <div>{item.title}</div>
                                </div>
                                <div>
                                    <div className="right">
                                        {formatCurrency(item.price)} x {item.count} {"  "}
                                        <button className="button" onClick={() => this.props.removeFromCart(item)}>
                                            Remove
                                        </button>
                                    </div>    
                                </div>
                            </li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    { cartItems.length !==0 && (<div className="total">
                            <div>
                                Total: {" "}
                                {formatCurrency(cartItems.reduce((a, c) => a + c.price*c.count ,0)) }
                            </div>
                            <button className="button primary">Proceed</button>
                        </div>)
                    } 
                </div>
            </div>
        )
    }
}

export default Cart
