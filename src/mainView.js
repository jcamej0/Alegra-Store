import React, { Component, PropTypes } from "react";
import ListProduct from "./productList.js";
import HeaderArea from "./headerArea";
import Footer from "./footer";

class mainView extends Component {
  render() {
    return (
      <div className="mainView">
        <HeaderArea />

        <div className="product-big-title-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="product-bit-title text-center">
                  <h2>TIENDA</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <ListProduct />
        </div>

        <Footer />
      </div>
    );
  }
}

export default mainView;
