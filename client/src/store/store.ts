import { configureStore, createSlice } from "@reduxjs/toolkit";
import Fetch from "../hooks/Fetch";

// ...
const init = {
  name: "",
  lastName: "",
  email: "",
  token: "",
  image: "",
};
const appSlice = createSlice({
  name: "app",
  initialState: init,
  reducers: {
    login(
      state,
      action: {
        payload: {
          name: string;
          lastName: string;
          email: string;
          token: string;
          image: any;
        };
      }
    ) {
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.image = action.payload.image;
      console.log(state.name);
    },
  },
});
const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    app: appSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const appActions = appSlice.actions;
export default store;
