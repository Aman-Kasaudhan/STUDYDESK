import { createSlice } from '@reduxjs/toolkit';

const initialState={
// user:null,
user:localStorage.getItem("user") 
        ? JSON.parse(localStorage.getItem("user")) 
        : null,
 

}

const profileSlice = createSlice({
  name:"profile",
  initialState: initialState,
  reducers: {
    // setUser(state,value){
    //   state.user=value.payload;
    // } ,
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
    },
   
  },
});
export const {setUser,clearUser}=profileSlice.actions;
export default profileSlice.reducer;
 