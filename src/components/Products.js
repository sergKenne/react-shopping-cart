import React, { Component } from 'react'
import formatCurrency from '../util'

class Products extends Component {

    render() {
        //console.log(this.props.products)
        return (
            <ul className="products">
                {
                 this.props.products.map(item => {
                        return (
                            <li key={item._id} className="product">
                                <img src={item.image} alt={item.title}/>
                                <p>{item.title}</p>
                                <div className="product-body">
                                    <span>{ formatCurrency(item.price) }</span>
                                    <button className="button primary">Add to cart</button>
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
