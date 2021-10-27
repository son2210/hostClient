import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { addProductApi } from '../api/add-product.api';

export const postAddProduct = createAsyncThunk(
  'add-product/postProduct',
  async (value, { rejectWithValue }) => {
    try {
      const response = await addProductApi.addProduct(value);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getInfo = createAsyncThunk(
  'add-product/getInfo',
  async (params) => {
    try {
      const response = await addProductApi.getInfo(params);
      return response.data;
    } catch (error) {}
  }
);

export const getProductTypes = createAsyncThunk(
  'add-product/getProductTypes',
  async () => {
    try {
      const response = await addProductApi.getProductTypes();
      return response.data;
    } catch (error) {}
  }
);

const initialState = {
  // product finished successfully
  productFinished: null,
  isProductFinishedLoading: false,

  // info product
  infoProduct: null,
  isInfoProductLoading: false,

  // product types
  isProductTypesLoading: false,
  productTypes: [],
};
const ProductAddSlice = createSlice({
  name: 'product-add',
  initialState,
  extraReducers: {
    [postAddProduct.pending]: (state) => {
      state.isProductFinishedLoading = true;
    },
    [postAddProduct.fulfilled]: (state, action) => {
      state.isProductFinishedLoading = false;
      state.productFinished = action.payload.data;
    },
    [postAddProduct.rejected]: (state) => {
      state.isProductFinishedLoading = false;
    },

    [getInfo.fulfilled]: (state, action) => {
      state.isInfoProductLoading = false;
      state.infoProduct = action.payload;
    },
    [getInfo.rejected]: (state) => {
      state.isInfoProductLoading = true;
    },

    // product types
    [getProductTypes.pending]: (state) => {
      state.isProductTypesLoading = true;
    },
    [getProductTypes.fulfilled]: (state, action) => {
      state.isProductTypesLoading = false;
      state.productTypes = action.payload.product_types;
    },
  },
});
const { reducer: productAddReducer } = ProductAddSlice;

export default productAddReducer;
