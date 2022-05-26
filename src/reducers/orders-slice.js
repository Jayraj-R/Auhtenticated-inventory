import { createSlice } from '@reduxjs/toolkit';
const data = require('../database/orders.json');

export const ordersSlice = createSlice({
	name: 'Orders',
	initialState: {
		orders: data,
	},
	reducers: {
		addOrder: (state, action) => {
			state.orders = [action.payload, ...state.orders];
		},
		updateOrder: (state, action) => {
			const itemIndex = state.orders.findIndex(
				(obj) => obj.id === action.payload.id
			);

			state.orders = [
				...state.orders.slice(0, itemIndex),
				action.payload,
				...state.orders.slice(itemIndex + 1),
			];
		},
		removeOrder: (state, action) => {
			state.orders = [
				...state.orders.slice(0, action.payload),
				...state.orders.slice(action.payload + 1),
			];
		},
	},
});

export const ordersActions = ordersSlice.actions;
