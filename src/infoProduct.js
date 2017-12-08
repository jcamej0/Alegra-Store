import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Route, NavLink, HashRouter } from "react-router-dom";
import actions from "./state/actions";
import HeaderArea from "./headerArea";
import ImageGallery from "react-image-gallery";
import Footer from "./footer";
import Slider from "react-slick";

class infoProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      infoProduct: [],
      currentProduct: [],
      selectedProduct: [],
      infoProductTwo: props.products || []
    };

    this.buyClick = this.buyClick.bind(this);
    this.cartClick = this.cartClick.bind(this);
  }

  cartClick(e) {
    e.preventDefault();
    let info = this.state.currentProduct;
    this.props.dispatch(actions.setCart(info));

    if (localStorage.getItem("carrito")) {
      let currentCart = JSON.parse(localStorage.getItem("carrito"));
      currentCart.push(info);
      localStorage.setItem("carrito", JSON.stringify(currentCart));
      localStorage.setItem(
        "precioTotal",
        parseInt(localStorage.getItem("precioTotal")) +
          parseInt(info.price[0].price)
      );
      localStorage.setItem(
        "cantidadCarrito",
        parseInt(localStorage.getItem("cantidadCarrito")) + 1
      );
    } else {
      let addCart = [];
      addCart.push(info);
      localStorage.setItem("carrito", JSON.stringify(addCart));
      localStorage.setItem("precioTotal", parseInt(info.price[0].price));
      localStorage.setItem("cantidadCarrito", 1);
    }
  }

  buyClick(e) {
    e.preventDefault();
    let info = this.state.currentProduct;
    if (!localStorage.getItem("Compras")) {
      let products = [];
      products.push(info);
      localStorage.setItem("Compras", JSON.stringify(products));
      this.props.dispatch(actions.setBuyed(info));
      alert("¡Gracias por su compra!");
      if (navigator.onLine) {
        this.createFactura();
      } else {
        this.pendingFacturas(info);
      }
    } else {
      let currentProducts = JSON.parse(localStorage.getItem("Compras"));
      currentProducts.push(info);
      localStorage.setItem("Compras", JSON.stringify(currentProducts));
      this.props.dispatch(actions.setBuyed(info));

      if (navigator.onLine) {
        this.createFactura();
      } else {
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

  async createFactura() {
    let info = this.state.currentProduct;
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
    console.log(response)

  }

  componentWillReceiveProps(nextProps) {
    let ide = nextProps.match.params.id;
    let producSelected = [];
    for (let x of nextProps.products) {
      if (x.id == ide) {
        producSelected.push(x);
      }
    }

    let infoProduct = producSelected.map((info, index) => {
      this.setState({
        currentProduct: info
      });
      const images = [
        {
          original: info.images[0].url,
          thumbnail: info.images[0].url
        }
      ];
      return (
        <div className="product-content-right" key={index}>
          <div className="row">
            <div className="col-sm-6">
              <div className="product-images">
                <div className="product-main-img">
                  <ImageGallery items={images} />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="product-inner">
                <h2 className="product-name">{info.name}</h2>
                <div className="product-inner-price">
                  <ins>${info.price[0].price}</ins>
                </div>

                <div className="cart">
                  <button
                    className="btn btn-info btn-lg"
                    onClick={this.cartClick}
                  >
                    <span className="glyphicon glyphicon-shopping-cart"></span>Agregar al carrito
                  </button>
                  <button
                    className="btn btn-success btn-lg"
                    onClick={this.buyClick}
                  >
                   <span className="glyphicon glyphicon-usd" ></span> Comprar
                  </button>
                </div>

                <div role="tabpanel">
                  <ul className="product-tab" role="tablist">
                    <li role="presentation" className="active">
                      <a
                        href="#home"
                        aria-controls="home"
                        role="tab"
                        data-toggle="tab"
                      >
                        Descripción
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      role="tabpanel"
                      className="tab-pane fade in active"
                      id="home"
                    >
                      <h2>Descripción del producto</h2>
                      <p>{info.description}.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    this.setState({
      selectedProduct: infoProduct
    });
  }

  componentDidMount() {
    let ide = this.props.match.params.id;
    let producSelected = [];
    for (let x of this.props.products) {
      if (x.id == ide) {
        producSelected.push(x);
      }
    }

    let infoProduct = producSelected.map((info, index) => {
      this.setState({
        currentProduct: info
      });
      const images = [
        {
          original: info.images[0].url,
          thumbnail: info.images[0].url
        }
      ];
      return (
        <div className="product-content-right" key={index}>
          <div className="row">
            <div className="col-sm-6">
              <div className="product-images">
                <div className="product-main-img">
                  <ImageGallery items={images} />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="product-inner">
                <h2 className="product-name">{info.name}</h2>
                <div className="product-inner-price">
                  <ins>${info.price[0].price}</ins>
                </div>

                <form action="" className="cart">
                  <button
                    className="btn btn-info btn-lg"
                    onClick={this.cartClick}
                  >
                    <span className="glyphicon glyphicon-shopping-cart"></span>Agregar al carrito
                  </button>
                  <button
                    className="btn btn-success btn-lg"
                    onClick={this.buyClick}
                  >
                   <span className="glyphicon glyphicon-usd" ></span> Comprar
                  </button>
                </form>

                <div role="tabpanel">
                  <ul className="product-tab" role="tablist">
                    <li role="presentation" className="active">
                      <a
                        href="#home"
                        aria-controls="home"
                        role="tab"
                        data-toggle="tab"
                      >
                        Descripción
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      role="tabpanel"
                      className="tab-pane fade in active"
                      id="home"
                    >
                      <h2>Descripción del producto</h2>
                      <p>{info.description}.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    this.setState({
      selectedProduct: infoProduct
    });
  }

  render() {
  	    let settings = {
      dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000
    };
    return (
      <div className="infoProduct">
        <HeaderArea />
                <div className="product-big-title-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="product-bit-title text-center">
                  <h2>{this.state.currentProduct.name}</h2>
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
                  {this.props.products.map((data, index) => {
                    return (
                      <NavLink to={"/producto/" + data.id} key={index}>
                        <div className="thubmnail-recent">
                          <img
                            src={data.images[0].url}
                            className="recent-thumb"
                            alt=""
                          />
                          <h2>
                            <div>{data.name}</div>
                          </h2>
                          <div className="product-sidebar-price">
                            <ins>${data.price[0].price}</ins>
                          </div>
                        </div>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-8">{this.state.selectedProduct}</div>
                 <div className="related-products-wrapper">
                            <h2 className="related-products-title">Productos Relacionados</h2>
                            <div className="related-products-carousel">


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
    products: state.product.products
  };
}

export default connect(mapStateToProps)(infoProduct);
