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
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Nueva acción asincrónica para agregar una fiesta
export const addPartyAsync = createAsyncThunk(
  "party/addParty",
  async (partyData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/fiestas/agregar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(partyData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add party");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Acción asíncrona para actualizar una fiesta
export const updateParty = (partyData) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/fiestas/${partyData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partyData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update party");
    }
    const updatedParty = await response.json();

    // Aquí podrías realizar alguna lógica adicional si es necesaria

    dispatch(partySlice.actions.updateParty(updatedParty));
    return updatedParty; // Devolver los datos actualizados si es necesario
  } catch (error) {
    console.error("Error updating party:", error.message);
    // Handle error if needed
    throw error; // Propagar el error para manejarlo en la llamada a updateParty
  }
};

const initialState = {
  items: [],
  search: "",
  status: "idle",
  error: null,
};

const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    setParties: (state, action) => {
      state.items = action.payload;
    },
    deleteParty: (state, action) => {
      state.items = state.items.filter((party) => party.id !== action.payload);
    },
    updateParty: (state, action) => {
      const index = state.items.findIndex(
        (party) => party.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
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
      })
      .addCase(addPartyAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { setParties, deleteParty, descountStockParty, setSearch } =
  partySlice.actions;

export const selectAllParties = (state) => state.party.items;
export const selectPartyById = (state, partyId) =>
  state.party.items.find((party) => party.id === partyId);
export const selectSearch = (state) => state.party.search;
export const selectPartyStatus = (state) => state.party.status;
export const selectPartyError = (state) => state.party.error;

export default partySlice.reducer;
