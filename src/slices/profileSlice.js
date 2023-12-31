import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: (() => {
        const storeUser = localStorage.getItem("user");
        try {
          // Trying to parse the user
          return storeUser ? JSON.parse(storeUser) : null;
        } catch (error) {
          console.error("Error parsing stored user:", error);
          return null;
        }
      })(),
    loading: false,
}

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer;

