const buys = localStorage.getItem('Compras') ? JSON.parse(localStorage.getItem('Compras')) : [];
const products = localStorage.getItem('articulosEnVenta') ? JSON.parse(localStorage.getItem('articulosEnVenta')) : [];
const cart = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
const totalPrice = localStorage.getItem('precioTotal') ? JSON.parse(localStorage.getItem('precioTotal')) : 0;
const quantity = localStorage.getItem('cantidadCarrito') ? JSON.parse(localStorage.getItem('cantidadCarrito')) : 0;

const initialState = {
	product: {
		products: products,
		buys: buys,
		cart: cart,
		totalPrice: totalPrice,
		quantity: quantity,
	},
}


const action = {
	type: 'SET_CART',
	payload: {},
}
function reducer(state = initialState ,action = {}){
	console.log("payload",action.payload)
	switch (action.type){
		case 'SET_CART':
			return Object.assign({},state,{
				product: Object.assign({},state.product,{
					cart: state.product.cart.concat(action.payload),
					totalPrice: state.product.totalPrice + parseInt(action.payload.price[0].price),
					quantity: state.product.quantity + 1
				})
			});
		case 'SET_PRODUCTS':
			return Object.assign({},state,{
				product: Object.assign({},state.product,{
					products: state.product.products.concat(action.payload.map(data=>{
						return data;
					}))
				})
			});
		case 'SET_BUYED':
			return Object.assign({},state,{
				product: Object.assign({},state.product,{
					buyed: action.payload
				})
			});
		case 'UPDATE_CART':
			return Object.assign({},state,{
				product: Object.assign({},state.product,{
					cart: action.payload.cart,
					totalPrice: state.product.totalPrice - action.payload.price,
					quantity: state.product.quantity - 1,
				})
			})
		case 'UPDATE_PRODUCTS':
			return Object.assign({},state,{
				product: Object.assign({},state.product,{
					products: action.payload,
				})
			})
	default: 
	return state;

	}

}

export default reducer;