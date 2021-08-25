import { configureStore } from '@reduxjs/toolkit'
import articleReducer from "./articleSlice"
import userReducer from "./userSlice"
import modalReducer from "./modalSlice"

export const store = configureStore({
  reducer: {
    article: articleReducer,
    user: userReducer,
    modal: modalReducer
  },
})