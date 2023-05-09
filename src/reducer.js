//look at the code above, it is a way of changing some property in our object when spreading, you can test it out

const reducer = (state, action) => {
  if (action.type == 'CLEAR_CART') {
    return { ...state, cart: [] }
  }

  if (action.type == 'REMOVE'){
    return {
      ...state,
      cart: state.cart.filter(
        (cardItem) => cardItem.id !== action.payload
        //accessed action.payload just like we had action.type.
        //we can have action.payload.something id our payload is another object on its own
      ),
    }
  }


  //set up the increase stuff

  if (action.type ==='INCREASE'){


    //we seetting up tempCart so we can pass it in as the cart later below, all the necessary checking will be done inside of the temp cart


    let tempCart = state.cart.map((cartitem) => {
      console.log(cartitem)
      if (cartitem.id === action.payload) {
        return { ...cartitem, amount: cartitem.amount + 1 }
      } //meaning if the id we are passing in when we click is equal to the id in the array then, change only the amount and  add 1 to it and on and on

      return cartitem //meaning else o, return only carditem without tampering with the amount
    })
    return { ...state, cart: tempCart }
  }


if(action.type=='LOADING'){
  return({...state, loading:true})
}
if (action.type == "DISPLAY_ITEMS"){
  return{...state, cart:action.payload, loading:false}
}


  if (action.type === 'GET_TOTAL') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem
        const itemTotal = price * amount
        cartTotal.total += itemTotal
        cartTotal.amount += amount
        return cartTotal
      },
      {
        total: 0,
        amount: 0,
      }
    )
    total = parseFloat(total.toFixed(2))
    return { ...state, total, amount }
  }



    if (action.type === 'DECREASE') {
      //set up for the decrease stuff
      let tempCart = state.cart
        .map((cartitem) => {
          if (cartitem.id === action.payload) {

            // note that if the payload is an object on its own, then we have action.payload. something and on and on and on
            return { ...cartitem, amount: cartitem.amount - 1 }
          }
          return cartitem
        })
        .filter((cartItem) => cartItem.amount !== 0)
      return { ...state, cart: tempCart }
    }

  return state
}


export default reducer

// const remove = (id) => {
// dispatch({ type: 'REMOVE', payload: id })
// }
