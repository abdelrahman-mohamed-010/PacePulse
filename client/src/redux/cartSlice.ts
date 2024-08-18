import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../components/GendreComp";

interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) {
      const newItem = action.payload.product;
      const quantity = action.payload.quantity;

      const existingItem = state.items.find(
        (item) => item.product.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product: newItem, quantity });
      }

      state.totalQuantity += quantity;
      state.totalPrice += newItem.attributes.price * quantity;
    },
    removeItemFromCart(state, action: PayloadAction<{ productId: number }>) {
      const id = action.payload.productId;
      const existingItem = state.items.find((item) => item.product.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -=
          existingItem.product.attributes.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.product.id !== id);
      }
    },
    updateItemQuantity(
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === productId
      );

      if (existingItem && quantity > 0) {
        state.totalQuantity += quantity - existingItem.quantity;
        state.totalPrice +=
          (quantity - existingItem.quantity) *
          existingItem.product.attributes.price;
        existingItem.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
