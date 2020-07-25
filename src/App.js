import React, {Component} from 'react';
import Products from './components/Products';
import data from "./data.json"
import Filter from './components/Filter';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: data.products,
      sort: "",
      size: "",
    }

    this.select = [...data.products];
  }

  sortProducts = e => {
    
    const sort = e.target.value
    this.setState({
      sort,
      products: [...this.state.products].sort((a,b) => 
        sort === "lowest"
          ? a.price > b.price
            ? 1
            : -1
          : sort === "highest"
          ? a.price < b.price
            ? 1
            : -1
          : a._id < b._id
          ? 1
          : -1
      )
    })
  }

  filterProducts = (e) => {
    if(e.target.value === "") {
      this.setState({
        products: data.products,
        size: e.target.value

      })
    } else {
      this.setState({
        products: data.products.filter( product => {
          return product.availableSizes.indexOf(e.target.value) >= 1
        }),
        size: e.target.value
      })
    }
  }

  render() {

    return (
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
              <Filter 
                  productsLength={this.state.products.length} 
                  filterProducts={this.filterProducts}
                  size={this.state.size}
                  sortProducts={this.sortProducts}
              />
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">
              <h1>Aside</h1>
            </div>
          </div>
        </main>
        <footer>
          <div className="footer">
            Footer
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
