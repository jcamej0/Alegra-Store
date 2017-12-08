import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import store from "./state/store";
import { Route, NavLink, HashRouter } from "react-router-dom";

class shoppingCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      infoProduct: props.cart || []
    };

  }

  componentDidMount() {
    store.subscribe(() => {
      let infoProduct = store.getState().product.info;
      this.setState({ infoProduct: infoProduct });
    });
  }

  render() {
    return (
      <div className="site-branding-area">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="logo">
                <NavLink to="/">
                  {" "}
                  <h1>ALEGRA STORE</h1>
                </NavLink>
              </div>
            </div>
            <NavLink to="/carritoDeCompras">
              <div className="col-sm-6">
                <div className="shopping-item">
                
                    Carrito -{" "}
                    <span className="cart-amunt">${this.props.price}</span>{" "}
                    <i className="fa fa-shopping-cart" />{" "}
                    <span className="product-count">{this.props.quantity}</span>
                
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  let product = state.product.products;
  let price = parseInt(state.product.price);

  return {
    products: product,
    price: state.product.totalPrice,
    quantity: state.product.quantity,
    cart: state.product.cart.length
  };
}
export default connect(mapStateToProps)(shoppingCart);
