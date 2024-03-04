import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLogin: JSON.parse(localStorage.getItem("isLogin") || "false"),
	userInfo: JSON.parse(localStorage.getItem("userInfo") || "null"),
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLogin = true;
			state.userInfo = action.payload;
		},
		logout: (state) => {
			state.isLogin = false;
			state.userInfo = null;
			localStorage.clear();
		},
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
