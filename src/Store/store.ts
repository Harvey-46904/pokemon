// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;  // Para usar con useSelector
export type AppDispatch = typeof store.dispatch;  // Para usar con useDispatch