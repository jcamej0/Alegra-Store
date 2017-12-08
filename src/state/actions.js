function setCart(product){
	return{
		type: 'SET_CART',
		payload: product,
	};
}


function setProducts(products){
	return{
		type: 'SET_PRODUCTS',
		payload: products,
	};
}

function setBuyed(products){
	return{
		type: 'SET_BUYED',
		payload: products,
	};
}


function updateCart(products){
	return({
		type: 'UPDATE_CART',
		payload: products,
	})
}

function updateProducts(products){
	return({
		type: 'UPDATE_PRODUCTS',
		payload: products,
	})
}


export default {
	setCart,
	setProducts,
	setBuyed,
	updateCart,
	updateProducts,
}