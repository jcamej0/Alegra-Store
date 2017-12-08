import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import store from "./state/store";
import HeaderArea from "./headerArea";
import actions from "./state/actions";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Footer from "./footer";
import Slider from "react-slick";

class viewShopingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: props.cart || []
    };
    this.handleBoughtItems = this.handleBoughtItems.bind(this);
    this.buyProduct = this.buyProduct.bind(this);
    this.deleteProductFromList = this.deleteProductFromList.bind(this);
  }

  buyProduct(ide, e) {
    e.preventDefault();
    let id = ide;
    let producSelected = {};
    for (let x of this.props.cart) {
      if (x.id == id) {
        Object.assign(producSelected, x);
      }
    }

    this.handleBoughtItems(producSelected);
  }


  deleteProductFromList(key, e) {
    e.preventDefault();
    /*Elimino los productos del carrito guardados en el localStorage y actualizo el storage de REDUX */
    (() => {
      let currentProductsFromCart = JSON.parse(localStorage.getItem("carrito"));
      let currentQuantityCart = JSON.parse(
        localStorage.getItem("cantidadCarrito")
      );
      let currentTotalPriceCart = JSON.parse(
        localStorage.getItem("precioTotal")
      );
      let price = currentProductsFromCart[key].price[0].price;
      currentProductsFromCart.splice(key, 1);
      let newState = {
        cart: currentProductsFromCart,
        price: price
      };
      localStorage.setItem("carrito", JSON.stringify(currentProductsFromCart));
      localStorage.setItem(
        "cantidadCarrito",
        parseInt(localStorage.getItem("cantidadCarrito")) - 1
      );
      localStorage.setItem(
        "precioTotal",
        parseInt(localStorage.getItem("precioTotal")) - price
      );

      this.props.dispatch(actions.updateCart(newState));
    })();

    /*Actualizo el store en Redux para mantener la navegación limpia*/

    (() => {})();
  }

  buyAllProduct(ide, e) {
    e.preventDefault();
    let id = ide;
    let producSelected = {};
    for (let x of this.props.cart) {
      if (x.id == id) {
        Object.assign(producSelected, x);
      }
    }



    this.handleBoughtItems(producSelected);
  }

  handleBoughtItems(product) {
    let info = product;
    if (!localStorage.getItem("Compras")) {
      let products = [];
      products.push(product);
      localStorage.setItem("Compras", JSON.stringify(products));
      this.props.dispatch(actions.setBuyed(info));
      if (navigator.onLine) {
        alert("¡Gracias por su compra!");
        this.createFactura(info);
      } else {
        alert("¡Gracias por su compra!");

        this.pendingFacturas(info);
      }
    } else {
      let currentProducts = JSON.parse(localStorage.getItem("Compras"));
      currentProducts.push(info);
      localStorage.setItem("Compras", JSON.stringify(currentProducts));
      this.props.dispatch(actions.setBuyed(info));

      if (navigator.onLine) {
        alert("¡Gracias por su compra!");
        this.createFactura(info);
      } else {
        alert("¡Gracias por su compra!");

        this.pendingFacturas(info);
      }
    }
  }

  pendingFacturas(products) {
    if (!localStorage.getItem("facturasPendientes")) {
      let productArray = [];
      productArray.push(products);
      localStorage.setItem("facturasPendientes", JSON.stringify(productArray));
    } else {
      let facturasPendientes = JSON.parse(
        localStorage.getItem("facturasPendientes")
      );
      facturasPendientes.push(products);
      localStorage.setItem(
        "facturasPendientes",
        JSON.stringify(facturasPendientes)
      );
    }
  }

  async createFactura(products) {
    let info = products;
    let copy = Object.assign({}, info);
    copy.quantity = 1;
    copy.price = info.price[0].price;
    const res = await fetch("https://app.alegra.com/api/v1/invoices", {
      method: "post",
      headers: {
        Authorization:
          "Basic amp1YW5jYl85NEBob3RtYWlsLmNvbTpjOGU2NTZhZmMwNTI5NWQyYTJiOQ",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        date: "2017-12-06",
        dueDate: "2017-12-09",
        client: 1,
        items: [copy]
      })
    });

    const response = await res.json();

  }

  componentDidMount() {

    if (!this.props.cart.length > 0) {
      alert("No posees nada en el carrito");
    }
  }

  render() {
    let content = null;
    let settings = {
      dots: true,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000
    };
    return (
      <div className="mainView">
        <HeaderArea />
                <div className="product-big-title-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="product-bit-title text-center">
                  <h2>CARRITO DE COMPRAS</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="single-product-area">
          <div className="zigzag-bottom" />
          <div className="container">
            <div className="row">
              <div className="col-md-4">
    

                <div className="single-sidebar">
                  <h2 className="sidebar-title">PRODUCTOS</h2>
                  {this.props.products.map((info, index) => {
                    return (
                      <NavLink to={"/producto/" + info.id} key={index}>
                        <div className="thubmnail-recent">
                          <img
                            src={info.images[0].url}
                            className="recent-thumb"
                            alt=""
                          />
                          <h2>
                            <div >{info.name}</div>
                          </h2>
                          <div className="product-sidebar-price">
                            <ins>${info.price[0].price}</ins>
                          </div>
                        </div>
                      </NavLink>
                    );
                  })}
                </div>
              </div>

              <div className="col-md-8">
                <div className="product-content-right">
                  <div className="woocommerce">
                    <table cellSpacing="0" className="shop_table cart">
                      <thead>
                        <tr>
                          <th className="product-remove">&nbsp;</th>
                          <th className="product-thumbnail">&nbsp;</th>
                          <th className="product-name">PRODUCTO</th>
                          <th className="product-price">PRECIO</th>
                          <th className="product-subtotal">ACCIÓN</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.cart.map((info, index) => {
                          return (
                            <tr className="cart_item" key={index}>
                              <td className="product-remove">
                                <a
                                  title="Eliminar articulo"
                                  className="remove"
                                  onClick={e => {
                                    this.deleteProductFromList(index, e);
                                  }}
                                >
                                  ×
                                </a>
                              </td>

                              <td className="product-thumbnail">
                                <NavLink to={"/producto/" + info.id}>
                                  <img
                                    width="145"
                                    height="145"
                                    className="shop_thumbnail"
                                    src={info.images[0].url}
                                  />
                                </NavLink>
                              </td>

                              <td className="product-name">
                                <a href="single-product.html">{info.name}</a>
                              </td>

                              <td className="product-price">
                                <span className="amount">
                                  ${info.price[0].price}
                                </span>
                              </td>

                              <td className="product-subtotal">
                                <button
                                  onClick={e => this.buyProduct(info.id, e)}
                                >
                                  {" "}
                                  COMPRAR{" "}
                                </button>
                              </td>
                            </tr>
                          );
                        })}

                        <tr>
                          <td className="actions" colSpan="6">
                            
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="cart-collaterals">
                      <div className="cross-sells">
                        <h2>Quizas estes interesado en...</h2>
                        <div className="products">
                          <Slider {...settings}>
                            {this.props.products.map((info, index) => (
                              <div key={index}>
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
                                  </div>
                                </div>
                              </div>
                            ))}
                          </Slider>
                        </div>
                      </div>

                      <div className="cart_totals ">
                        <h2>RESUMEN</h2>

                        <table cellSpacing="0">
                          <tbody>
                            <tr className="cart-subtotal">
                              <th>Precio del carrito:</th>
                              <td>
                                <span className="amount">
                                  ${this.props.totalPrice}
                                </span>
                              </td>
                            </tr>

                            <tr className="shipping">
                              <th>Costo Envio: </th>
                              <td>Envio Gratis</td>
                            </tr>

                            <tr className="order-total">
                              <th>Precio total</th>
                              <td>
                                <strong>
                                  <span className="amount">
                                    ${this.props.totalPrice}
                                  </span>
                                </strong>{" "}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    cart: state.product.cart,
    totalPrice: state.product.totalPrice,
    products: state.product.products
  };
}

export default connect(mapStateToProps)(viewShopingCart);
