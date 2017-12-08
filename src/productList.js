import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Route, NavLink, HashRouter } from "react-router-dom";
import actions from "./state/actions";
import Slider from "react-slick";
class productList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: props.products || [],
      info: [],
      lastFetch:  [],
      cart: props.cart || [],
      loading: true
    };

    this.handleCart = this.handleCart.bind(this);
    this.filterList = this.filterList.bind(this);
  }

  handleCart(ide) {
    let producSelected;
    for (let x of this.props.products) {
      if (x.id == ide) {
        producSelected = x;
      }
    }

    this.props.dispatch(actions.setCart(producSelected));

    if (localStorage.getItem("carrito")) {
      let currentCart = JSON.parse(localStorage.getItem("carrito"));
      currentCart.push(producSelected);
      localStorage.setItem("carrito", JSON.stringify(currentCart));
      localStorage.setItem(
        "precioTotal",
        parseInt(localStorage.getItem("precioTotal")) +
          parseInt(producSelected.price[0].price)
      );
      localStorage.setItem(
        "cantidadCarrito",
        parseInt(localStorage.getItem("cantidadCarrito")) + 1
      );
    } else {
      let addCart = [];
      addCart.push(producSelected);
      localStorage.setItem("carrito", JSON.stringify(addCart));
      localStorage.setItem(
        "precioTotal",
        parseInt(producSelected.price[0].price)
      );
      localStorage.setItem("cantidadCarrito", 1);
    }
  }

  filterList(event) {
    let updatedList = this.props.products;
    updatedList = updatedList.filter(function(item) {
      return (
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ products: updatedList });
  }

  async initialFetch() {
    const res = await fetch("https://app.alegra.com/api/v1/items", {
      method: "get",
      headers: {
        Authorization:
          "Basic amp1YW5jYl85NEBob3RtYWlsLmNvbTpjOGU2NTZhZmMwNTI5NWQyYTJiOQ",
        "content-type": "application/json"
      }
    });

    const response = await res.json();

    if (!this.props.products.length > 0) {
      this.props.dispatch(actions.setProducts(response));
      localStorage.setItem("articulosEnVenta", JSON.stringify(response));
      this.setState({products:response})

    } else if (
      JSON.parse(localStorage.getItem("articulosEnVenta")).length ===
      response.length
    ) {
    } else {

      localStorage.removeItem("articulosEnVenta");
      this.props.dispatch(actions.updateProducts(response));
      localStorage.setItem("articulosEnVenta", JSON.stringify(response));
    }
    this.setState({
      loading: false
    });
  }

  async componentDidMount() {
    this.initialFetch();
  }

  render() {
    const isLoading = this.state.loading;
    let content = null;

    return (
      <div className="row">
        <form className="col-md-12 col-sm-12">
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control form-control-lg input-lg"
              placeholder="Buscar Productos"
              onChange={this.filterList}
            />
          </fieldset>
        </form>

        {this.state.products.map(info => (
          <div key={info.id}>
            <div className="col-md-3 col-sm-6">
              <div className="single-shop-product">
                <NavLink to={"/producto/" + info.id}>
                  <div className="product-upper">
                    <img src={info.images[0].url} alt="" />
                  </div>

                  <h2>
                    <div>{info.name}</div>
                  </h2>
                </NavLink>
                <div className="product-carousel-price">
                  <ins>${info.price[0].price}</ins>
                </div>

                <div className="product-option-shop">
                  <button
                    className="add_to_cart_button"
                    onClick={() => this.handleCart(info.id)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    products: state.product.products,
    cart: state.product.cart
  };
}
export default connect(mapStateToProps)(productList);
