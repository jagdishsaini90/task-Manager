import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";
import loginReducer from "./slices/loginSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    login: loginReducer,
  },
});

export default store;
