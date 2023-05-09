import React, { useState, useContext, useReducer, useEffect, createContext } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN


//the api that we are getting stuffs from
const url = 'https://course-api.com/react-useReducer-cart-project'

const AppContext=createContext()

const initialState={
  loading:false,
  cart:cartItems,
  total:0,
  amount:0 
}


const AppProvider = ({children}) => {
//the function below is to clear the container and set it to an empty array
  const [state, dispatch] = useReducer(reducer, initialState)
  
  const increase=(id)=>{ 
    dispatch({type:'INCREASE', payload:id})
  }

   const decrease = (id) => {
     dispatch({ type: 'DECREASE', payload:id})
   }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART'})
  } 


  const fetchData=async()=>{
      dispatch({type:'LOADING'})
      const response=await fetch(url)
      const cart=await response.json()
      dispatch({type:'DISPLAY_ITEMS', payload:cart})
  }

  useEffect(()=>{
    fetchData()
  }, [])
  //empty array dependency means,  just fetch it once



  //the useeffct below does not need to be passsed into a function or button, cos we are saying anythime that itmes in state.cart changes, then make sure that you rerender so we can dispactch the total that we set
    useEffect(()=>{
      dispatch({type:'GET_TOTAL'})
    },[state.cart])


    //the useeffect above is saying that, rerun the dispatch command everytime the (state.cart) changes which consists of the amount,id,price etc. Since anytime we change stuffs the page rerenders, and hence do the total calculation again

  //this is to remove individual item
    const remove=(id) => {
      //the id that we set above is the paramwter we are passing to the payload in the object below so we can pass it along to the button where we use the id from our array of object , also recall that the payload can be an object on its own also which we can access with action.payload. anything that we have or we went to access
      dispatch({ type: 'REMOVE', payload: id})
    }

  //every function that we are setting up insde of this can be accessed elsewhere we are using

  return (
    <AppContext.Provider value={{...state, clearCart, remove, increase, decrease}}>
      {children}
    </AppContext.Provider>
  )
}

//the below function is what we will be setting up so instead of setting it up in all of our component we just make use of the useglobsl context straight away

 const useGlobalContext = () => {
  return useContext(AppContext)
}

export {AppContext, AppProvider, useGlobalContext}
