import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import rootSaga from "./rootSaga";
import reducer from "./reducers";

// Setup redux store and apply  middlewares
const saga = createSagaMiddleware();
const store = configureStore({
  reducer: reducer,
  middleware: [saga]
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Export a typed useDispatch to use with typescript
export const useAppDispatch = () => useDispatch<AppDispatch>() 

export default store;