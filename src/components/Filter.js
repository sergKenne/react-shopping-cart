import React, { Component } from 'react'
import { connect } from 'react-redux';
import { filterProducts, sortProducts } from '../action/productAction';


class Filter extends Component {
    render() {
      const { products, filterProducts, filteredItems, sortProducts } = this.props;
     
        return (
          <div className="filter">
            <div className="filter-result">{filteredItems && filteredItems.length} Products</div>
            <div className="filter-sort">
              Order{' '}
              <select
                value={this.props.sort}
                onChange={(e) => sortProducts(filteredItems, e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="lowest">Lowest</option>
                <option value="highest">Highest</option>
              </select>
            </div>
            <div className="filter-size">
              Filter{' '}
              <select onChange={(e) => filterProducts(products, e.target.value)}>
                <option value="">All</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
  products: state.products.items,
  size: state.products.size,
  sort: state.products.sort,
  filteredItems: state.products.filteredItems,
  
});

const mapDispatchToProps = (dispatch) => ({
  filterProducts: (products, size) => dispatch(filterProducts(products, size)),
  sortProducts: (filterProd, sort) => dispatch(sortProducts(filterProd, sort)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
