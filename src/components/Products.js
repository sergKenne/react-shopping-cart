import React, { Component } from 'react'

class Products extends Component {


    render() {
        //console.log(this.props.products)
        return (
            <ul>
                {
                 this.props.products.map(item => {
                        return (
                            <li key={item._id}>
                                <img src={item.image} alt={item.title}/>
                                <p>{item.title}</p>
                                <div>
                                    <span>{item.price}</span>
                                    <button>Add to cart</button>
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
