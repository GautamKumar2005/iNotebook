// import { createContext } from "react";
// export const countercon=createContext(0);

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../counter/counterSlice';
import { useSelector, useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
