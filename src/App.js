import React, {Component} from 'react';
import Products from './components/Products';
import data from "./data.json"









class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: data.products
    }
  }

  render() {

    //console.log(this.state.products);


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
