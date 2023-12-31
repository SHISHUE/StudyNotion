import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { IoWarning } from "react-icons/io5";

const initialState = {
  cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
  totalItems: localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    setTotalItems(state, action) {
      state.totalItems = action.payload;
    },
    setAddCart(state, action) {
      const { id, name, price } = action.payload;
      const existingItem = state.cart.find(item => item.id === id);

      if (existingItem) {
        state.cart = state.cart.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        state.cart.push({ id, name, price, quantity: 1 });
      }

      state.totalItems += 1;

      // Example: show a toast notification
      toast.success(`${name} added to the cart!`);
    },
    setRemoveCart(state, action) {
      const { id } = action.payload;
      const existingItem = state.cart.find(item => item.id === id);

      if (existingItem) {
        state.cart = state.cart.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter(item => item.quantity > 0);

        state.totalItems -= 1;

        // Example: show a toast notification
        toast.info(`${existingItem.name} removed from the cart!`);
      }
    },
    setResetCart(state) {
      state.cart = [];
      state.totalItems = 0;

      // Example: show a toast notification
      toast.custom(<div className='flex gap-3 items-center justify-between text-richblack-800 text-[18px] font-semibold p-3 rounded-lg bg-white'><IoWarning className='text-[#dc4848] text-lg'/> Cart has been reset!</div>);
    },
  },
});

export const { setTotalItems, setResetCart, setAddCart, setRemoveCart } = cartSlice.actions;
export default cartSlice.reducer;
