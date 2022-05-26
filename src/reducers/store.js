import { ordersSlice } from './orders-slice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		ordersSliceReducer: ordersSlice.reducer,
	},
});

export default store;
