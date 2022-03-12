import { configureStore } from '@reduxjs/toolkit'

import productModalReducer from './product-modal/productModalSlice'

import cartItemsReducer from './shopping-cart/cartItemsSlide'
import showValueReducer from './setvalue-cart/showvalue'
import accountReducer from './accountslice/accountslice'
export const store = configureStore({
    reducer: {
        productModal: productModalReducer,
        cartItems: cartItemsReducer,
        showValue: showValueReducer,
        account: accountReducer,
        
    },
})