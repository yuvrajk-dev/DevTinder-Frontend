import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, actions) => actions.payload,
    removeConnections: () => null,
  },
});

export const { addConnections, removeConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;
