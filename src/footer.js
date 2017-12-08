import React, { Component } from "react";

class footer extends Component {
  render() {
    return (
      <div>

        <div className="footer-bottom-area">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="copyright">
                  <p>
                    &copy; 2017 AlegraStore. All Rights Reserved.{" "}
                    <a href="http://www.alegra.com" target="_blank">
                      alegra.com
                    </a>
                  </p>
                  <p>        Prototipo de tienda desarrollado en React y Redux, haciendo
                    uso de localStorage para caracteristicas offline.</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="footer-card-icon">
                  <i className="fa fa-cc-discover" />
                  <i className="fa fa-cc-mastercard" />
                  <i className="fa fa-cc-paypal" />
                  <i className="fa fa-cc-visa" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default footer;
