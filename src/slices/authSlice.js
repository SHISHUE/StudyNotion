import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  signupData: null,
  loading: false,
  token: (() => {
    const storedToken = localStorage.getItem("token");
    try {
      // Trying to parse the token
      return storedToken ? JSON.parse(storedToken) : null;
    } catch (error) {
      console.error("Error parsing stored token:", error);
      
      return null;
    }
  })(),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setToken, setSignupData, setLoading } = authSlice.actions;
export default authSlice.reducer;
