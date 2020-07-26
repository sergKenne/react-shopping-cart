import React, { Component } from 'react'
import formatCurrency from '../util'

class Products extends Component {

    render() {
       
        return (
            <ul className="products">
                {
                 this.props.products.map(product => {
                        return (
                            <li key={product._id} className="product">
                                <img src={product.image} alt={product.title}/>
                                <p>{product.title}</p>
                                <div className="product-body">
                                    <span>{ formatCurrency(product.price) }</span>
                                    <button className="button primary" onClick={() => this.props.addToCart(product) }>Add to cart</button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

export default Products
