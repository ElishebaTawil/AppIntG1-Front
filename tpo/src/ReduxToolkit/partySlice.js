// src/ReduxToolkit/partySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFiestas, fetchFiestaById, createFiesta, updateFiesta, deleteFiesta, descountStockParty } from '../API/FiestaApi';

const initialState = {
  items: [],
  search: '',
  status: 'idle',
  error: null,
};

export const getFiestas = createAsyncThunk('party/getFiestas', async () => {
  const response = await fetchFiestas();
  return response;
});

export const getFiestaById = createAsyncThunk('party/getFiestaById', async (fiestaId) => {
  const response = await fetchFiestaById(fiestaId);
  return response;
});

export const addFiesta = createAsyncThunk('party/addFiesta', async (fiesta) => {
  const response = await createFiesta(fiesta);
  return response;
});

export const updateFiestaData = createAsyncThunk('party/updateFiesta', async ({ id, fiesta }) => {
  const response = await updateFiesta(id, fiesta);
  return response;
});

export const deleteFiestaData = createAsyncThunk('party/deleteFiesta', async (fiestaId) => {
  await deleteFiesta(fiestaId);
  return fiestaId;
});

export const descountStockPartyData = createAsyncThunk('party/descountStockParty', async ({ id, quantity }) => {
  const response = await descountStockParty(id, quantity);
  return response;
});

const partySlice = createSlice({
  name: 'party',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFiestas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFiestas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getFiestas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getFiestaById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFiestaById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(getFiestaById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addFiesta.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateFiestaData.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteFiestaData.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(descountStockPartyData.fulfilled, (state, action) => {
        const updatedParty = action.payload;
        const index = state.items.findIndex(party => party.id === updatedParty.id);
        if (index !== -1) {
          state.items[index].stock = updatedParty.stock;
        }
      });
  },
});

export const { setSearch } = partySlice.actions;

// Selectors
export const selectAllParties = (state) => state.party.items;
export const selectSearch = (state) => state.party.search;

export default partySlice.reducer;
