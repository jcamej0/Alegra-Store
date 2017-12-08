import React, { Component } from 'react';
import {Route,NavLink,HashRouter,Switch} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import infoProduct from './infoProduct.js';
import listProduct from './productList.js';
import mainView from './mainView.js';
import viewShopingCart from './viewShopingCart.js';
import buys from './buys.js';


class App extends Component {

  render(){
    return(
      <div className="content">
       <Switch>
         <Route exact path="/" component={mainView} />
         <Route path="/producto/:id" component={infoProduct} />
         <Route path="/carritoDeCompras" component={viewShopingCart} />
         <Route path="/compras" component={buys} />
        </Switch>
      </div>
    )
  }
  
}

export default App;
