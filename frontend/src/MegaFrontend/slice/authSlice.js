import { createSlice } from '@reduxjs/toolkit';

// localStorage.removeItem("token");
const initialState = {
  loading: false,
  token: localStorage.getItem("token"),
  // user:localStorage.getItem("user") 
  //       ? JSON.parse(localStorage.getItem("user")) 
  //       : null,
  // user:null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload || null;
      // localStorage.setItem("token", action.payload); // ✅ keep token stored
      if (action.payload) {
    localStorage.setItem("token", action.payload);
  } else {
    localStorage.removeItem("token");
  }
    },
     
    // setLoading(state, action) {
    //   state.loading = action.payload;
    // },
    logout(state) {
      state.token = null;
      localStorage.removeItem("token"); // ✅ removes token
    },
  },
});

export const { setToken, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;
