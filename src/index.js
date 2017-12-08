import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom';
import store from './state/store';
import './index.css';
import './css/bootstrap.min.css';
import './css/responsive.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-image-gallery/styles/css/image-gallery.css";
import App from './App';
import registerServiceWorker from './registerServiceWorker';


console.log(store.getState());

ReactDOM.render(
<Provider store={store}>
	<BrowserRouter>
		<App />
	</BrowserRouter>
</Provider>, 
	document.getElementById('root'));


