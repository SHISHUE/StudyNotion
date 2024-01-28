import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { IoWarning } from "react-icons/io5";

const getInitialState = () => ({
  cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
  totalItems: localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : 0,
});

const initialState = getInitialState();

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    setAddCart(state, action) {
      const course = action.payload;
      const existingItemIndex = state.cart.findIndex(item => item._id === course._id);

      if (existingItemIndex >= 0) {
        // Course already in cart
        toast.error("Course already in cart");
      } else {
        // Course not in cart, add it
        state.cart.push(course);

        // Update total items and total price
        state.totalItems++;
        state.total += course.price;

        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

        // Example: show a toast notification
        toast.success(`${course.courseTitle} added to the cart!`);
      }
    },
    setRemoveCart(state, action) {
      const courseId = action.payload;
      const existingItemIndex = state.cart.findIndex(item => item._id === courseId);
    
      if (existingItemIndex >= 0) {
        const existingItem = state.cart[existingItemIndex];
    
        // Decrease quantity or remove entirely
        if (existingItem.quantity > 1) {
          state.cart[existingItemIndex] = { ...existingItem, quantity: existingItem.quantity - 1 };
        } else {
          state.cart.splice(existingItemIndex, 1);
        }
    
        // Update total items
        state.totalItems--;
    
        // Update total price
        state.total -= existingItem.price;
    
        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    
        // Example: show a toast notification
        toast.success(`${existingItem.courseTitle} removed from the cart!`);
      }
    },
    setResetCart(state) {
      // Reset cart state
      state.cart = [];
      state.totalItems = 0;
      state.total = 0;

      // Save to localStorage
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");

      // Example: show a toast notification
      toast.custom(<div className='flex gap-3 items-center justify-between text-richblack-800 text-[18px] font-semibold p-3 rounded-lg bg-white'><IoWarning className='text-[#dc4848] text-lg'/> Cart has been reset!</div>);
    },
  },
});

export const { setAddCart, setRemoveCart, setResetCart } = cartSlice.actions;
export default cartSlice.reducer;
