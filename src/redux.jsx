import { configureStore, createSlice } from "@reduxjs/toolkit";

// Slice for invoices
const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    setInvoices: (state, action) => {
      return action.payload;
    },
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
  },
});

// Slice for products
const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
  },
});

// Slice for customers
const customersSlice = createSlice({
  name: "customers",
  initialState: [],
  reducers: {
    setCustomers: (state, action) => {
      return action.payload;
    },
    addCustomer: (state, action) => {
      state.push(action.payload);
    },
    updateCustomer: (state, action) => {
      const index = state.findIndex(
        (customer) => customer.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeCustomer: (state, action) => {
      return state.filter((customer) => customer.id !== action.payload);
    },
  },
});

// Configure the store with the slices
export const store = configureStore({
  reducer: {
    invoices: invoicesSlice.reducer,
    products: productsSlice.reducer,
    customers: customersSlice.reducer,
  },
});

// Export actions for dispatching
export const {
  setInvoices,
  addInvoice,
  updateInvoice,
  removeInvoice,
} = invoicesSlice.actions;

export const {
  setProducts,
  addProduct,
  updateProduct,
  removeProduct,
} = productsSlice.actions;

export const {
  setCustomers,
  addCustomer,
  updateCustomer,
  removeCustomer,
} = customersSlice.actions;
