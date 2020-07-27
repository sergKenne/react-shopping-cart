import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: null,
        };
    }

    openModal = (product) => {
        this.setState({ product: product});
    }

    closeModal = () => {
        this.setState({product: null})
    }

    render() {
       const {product} = this.state;
        return (
            <div>
                <Fade bottom cascade >
                    <ul className="products">
                        {
                        this.props.products.map(product => {
                                return (
                                    <li key={product._id} className="product">
                                        <a href={"#" + product._id}  onClick={() => this.openModal(product)}>
                                            <img src={product.image} alt={product.title} />
                                            <p>{product.title}</p>
                                        </a>
                                        <div className="product-body">
                                            <span>{ formatCurrency(product.price) }</span>
                                            <button className="button primary" onClick={() => this.props.addToCart(product) }>Add to cart</button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Fade>
                {product && (
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className="close-modal" onClick={this.closeModal}>X</button>
                                <div className="product-details">
                                    <img src={product.image} alt={product.title} />
                                    <div className="product-details-description">
                                        <p>
                                            <strong>{product.title}</strong>
                                        </p>
                                        <p>{product.description}</p>
                                        <p>
                                            Available Sizes:{" "}
                                            {product.availableSizes.map(x => (
                                                <span key={x}> {"  "}
                                                    <button className="button">{x}</button>
                                                </span>
                                                ))
                                            }
                                        </p>
                                        <div className="product-body">
                                            <span>{formatCurrency(product.price)}</span>
                                            <button className="button primary" onClick={() => {
                                                this.props.addToCart(product);
                                                this.closeModal();
                                            }}>
                                                addToCart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>    
                        </Modal>
                    )
                }
        </div> 
       )
    }
}

export default Products
