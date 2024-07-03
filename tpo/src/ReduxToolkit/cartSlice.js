import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";

// Action asíncrona para crear una orden de compra
export const createOrderAsync = createAsyncThunk(
  "cart/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/api/ordenes/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Define el slice de Redux para el carrito
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    subtotal: 0,
    discount: 0,
    total: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    addToCart(state, action) {
      const evento = action.payload;
      const item = state.cartItems.find((item) => item.id === evento.id);

      if (item) {
        const nuevaCantidad = item.cantidad + evento.cantidad;
        state.cartItems = [
          ...state.cartItems.filter((item) => item.id !== evento.id),
          { ...evento, cantidad: nuevaCantidad },
        ];
      } else {
        state.cartItems.push({ ...evento });
      }
      state.subtotal = state.cartItems.reduce((total, item) => {
        return total + item.price * item.cantidad;
      }, 0);
      state.total = state.subtotal - state.discount;
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      state.subtotal = state.cartItems.reduce((total, item) => {
        return total + item.price * item.cantidad;
      }, 0);
      state.total = state.subtotal - state.discount;
    },
    removeAllFromCart(state) {
      state.cartItems = [];
      state.subtotal = 0;
      state.discount = 0;
      state.total = 0;
    },
    applyPromoCode(state, action) {
      const promoCode = action.payload;
      if (promoCode === "1234") {
        state.discount = state.subtotal * 0.1;
      } else {
        state.discount = 0;
      }
      state.total = state.subtotal - state.discount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Aquí podrías realizar alguna lógica adicional si es necesaria
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selector para calcular el número total de elementos en el carrito
export const selectTotalCartItems = createSelector(
  (state) => state.cart.cartItems,
  (cartItems) => {
    let totalItems = 0;
    cartItems.forEach((item) => {
      totalItems += item.cantidad; // Ajusta esto según la estructura de tus items
    });
    return totalItems;
  }
);

// Otros selectores aquí
export const selectTotalCartAmount = (state) => state.cart.total;
export const selectSubtotal = (state) => state.cart.subtotal;
export const selectDiscount = (state) => state.cart.discount;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;

export const { addToCart, removeFromCart, removeAllFromCart, applyPromoCode } =
  cartSlice.actions;

export default cartSlice.reducer;
