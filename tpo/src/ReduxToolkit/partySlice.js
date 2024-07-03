import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Acción asíncrona para fetch de las fiestas
export const fetchParties = createAsyncThunk(
  "party/fetchParties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/api/fiestas");
      if (!response.ok) {
        throw new Error("Failed to fetch parties");
      }
      const data = await response.json();
      return data; // Devuelve los datos para que se actualicen en el estado
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Acción asíncrona para agregar una fiesta
export const addPartyAsync = createAsyncThunk(
  "party/addParty",
  async (newParty, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const response = await fetch(
        "http://localhost:8080/api/fiestas/agregar",
        {
          method: "POST",
          body: JSON.stringify(newParty),
          headers: myHeaders,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add party");
      }

      const data = await response.json();
      return data; // Devuelve los datos de la nueva fiesta para que se actualicen en el estado
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    setParties: (state, action) => {
      state.items = action.payload;
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
        console.log(action.payload);
      })
      .addCase(fetchParties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log(action.error.message);
      })
      .addCase(addPartyAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPartyAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addPartyAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setParties,
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
