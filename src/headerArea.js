import React, { Component, PropTypes } from "react";
import ShoppingCart from "./shoppingCart";
import { Route, NavLink, HashRouter } from "react-router-dom";

class headerArea extends Component {
  constructor() {
    super();
    this.state={
    	one: true,
    	two: false,
    	three: false,
    }
    if (localStorage.getItem("facturasPendientes")) {
      let pending = JSON.parse(localStorage.getItem("facturasPendientes"));

      let timer = setInterval(() => {
        addFactures(pending);
      }, 10000);

      function addFactures(factura) {
        let info = factura[0];
        let copy = Object.assign({}, info);
        copy.quantity = 1;
        copy.price = info.price[0].price;
        fetch("https://app.alegra.com/api/v1/invoices", {
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
        })
          .then(response => {
            return response.json();
          })
          .then(response => {
            if (response.id) {
              pending.shift();
              if (pending.length > 0) {
              } else {
                clearInterval(timer);
                localStorage.removeItem("facturasPendientes");
              }
            }
          });
      }
    }
  }




  render() {
    return (
      <div className="headerArea">
        <div className="header-area">
          <div className="container">
            <div className="row">
              <div className="col-md-8" />

              <div className="col-md-4">
                <div className="header-right">
                  <ul className="list-unstyled list-inline">
                    <li className="dropdown dropdown-small" />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ShoppingCart />

        <div className="mainmenu-area">
          <div className="container">
            <div className="row">
              <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li>
                    <NavLink to="/">Inicio</NavLink>
                  </li>
                  <li>
                    <NavLink to="/compras">Compras realizadas</NavLink>
                  </li>
                  <li>
                    <NavLink to="/carritoDeCompras">Carrito de compras</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default headerArea;
