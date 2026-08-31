import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      const existingIds = new Set(state.map((user) => user._id));

      const newUsers = action.payload.filter(
        (user) => !existingIds.has(user._id),
      );

      return [...state, ...newUsers];
    },
    removeFeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
