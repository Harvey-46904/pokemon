// src/store/pokemonSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonState {
  limit: number;
  offset: number;
  search: string;
}

const initialState: PokemonState = {
  limit: 20,
  offset: 0,
  search: ''
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    }
  }
});

export const { setLimit, setOffset, setSearch } = pokemonSlice.actions;
export default pokemonSlice.reducer;
