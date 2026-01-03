import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem("token");
const initialState={
user:null,

// user: token && localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null,

 

}

const profileSlice = createSlice({
  name:"profile",
  initialState: initialState,
  reducers: {
    
     setUser(state, action) {
          state.user = action.payload || null;
          if (action.payload) {
            localStorage.setItem("user", JSON.stringify(action.payload));
          } else {
            localStorage.removeItem("user");
          }
        },
    clearUser(state){
      state.user=null;
      localStorage.removeItem("user");
    },
   
  },
});
export const {setUser,clearUser}=profileSlice.actions;
export default profileSlice.reducer;
 