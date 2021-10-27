import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addPro } from './../api/product.api';
export const addProduct = createAsyncThunk(
  'product_add/add',
  async (newProduct) => {
    const response = await addPro(newProduct);
    console.log('product mới ', response);
  }
);
const initialState = {
  data: [],
  loaded: false,
};
const ProductAddSlice = createSlice({
  name: 'product_add',
  initialState,
  extraReducers: {
    [addProduct.fulfilled]: (state, action) => {
    },
    [addProduct.rejected]: (state, action) => {
    },
  },
});
const { reducer: productAddReducer } = ProductAddSlice;

export default productAddReducer;