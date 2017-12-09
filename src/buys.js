import React, { Component, PropTypes } from "react";
import HeaderArea from "./headerArea";
import { connect } from "react-redux";
import Footer from "./footer";
import { Route, NavLink, HashRouter } from "react-router-dom";

class buys extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buys: []
    };
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("Compras"))) {
      let items = JSON.parse(localStorage.getItem("Compras"));
      let buyList = items.map((info, index) => {
        return (
          <tr className="cart_item" key={index}>
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
              <p>{info.name}</p>
            </td>

            <td className="product-price">
              <span className="amount">${info.price[0].price}</span>
            </td>
          </tr>
        );
      });

      this.setState({ buys: buyList });
    } else {
      let buyList = (() => {
        return (
          <tr className="cart_item">
            <td className="product-thumbnail">
              <span>No posee compras</span>
            </td>

            <td className="product-name">
              <span>No posee compras</span>
            </td>

            <td className="product-price">
              <span>No posee compras</span>
            </td>
          </tr>
        );
      })();

      this.setState({ buys: buyList });
    }
  }
  render() {
    return (
      <div>
        <HeaderArea />

        <div className="product-big-title-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="product-bit-title text-center">
                  <h2>MIS COMPRAS</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 col-sm-12">
            <table cellSpacing="0" className="shop_table cart">
              <thead>
                <tr>
                  <th className="product-thumbnail">Imagen</th>
                  <th className="product-name">PRODUCTO</th>
                  <th className="product-price">PRECIO</th>
                </tr>
              </thead>
              <tbody>{this.state.buys}</tbody>
            </table>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    buys: state.product.buys
  };
}
export default connect(mapStateToProps)(buys);
