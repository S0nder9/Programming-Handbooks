import { createSlice } from "@reduxjs/toolkit"; 

const initialCounterState = { counter: 0, isCounterInvisible: false };

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.payload;
    },
    setCounterVisibility(state) {
      state.isCounterInvisible = !state.isCounterInvisible;
    }
  }
});

export const counterActions = counterSlice.actions;

export default counterSlice;