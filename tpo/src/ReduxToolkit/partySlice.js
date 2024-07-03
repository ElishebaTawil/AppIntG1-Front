import all_parties from "../Components/Assets/all_parties";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Acción asíncrona para fetch de las fiestas
export const fetchParties = createAsyncThunk("party/fetchParties", async () => {
  const response = await fetch("http://localhost:8080/api/fiestas");
  const data = await response.json();
  return data; // Devuelve los datos para que se actualicen en el estado
});

const initialState = {
  items: [],
  search: "",
  status: "idle", // Estado para manejar la solicitud asíncrona
  error: null,
};

const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    setParties: async (state, action) => {
      state.items = action.payload;
    },
    addParty: async (state, action) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      await fetch("http://localhost:8080/api/fiestas/agregar", {
        method: "POST",
        body: JSON.stringify(action.payload),
        headers: myHeaders,
      }).catch((error) => console.error(error));

      state.items.push(action.payload);
    },

    updateParty: (state, action) => {
      const index = state.items.findIndex(
        (party) => party.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteParty: (state, action) => {
      state.items = state.items.filter((party) => party.id !== action.payload);
    },
    descountStockParty: (state, action) => {
      const { id, quantity } = action.payload;
      const party = state.items.find((party) => party.id === id);
      if (party) {
        party.stock -= quantity;
      }
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchParties.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchParties.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchParties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setParties,
  addParty,
  updateParty,
  deleteParty,
  descountStockParty,
  setSearch,
} = partySlice.actions;

// Selectores
export const selectAllParties = (state) => state.party.items;
export const selectPartyById = (state, partyId) =>
  state.party.items.find((party) => party.id === partyId);
export const selectSearch = (state) => state.party.search;
export const selectPartyStatus = (state) => state.party.status;
export const selectPartyError = (state) => state.party.error;

export default partySlice.reducer;
