import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: '',
  isAuthenticated: false,
  error: false,
  isAdmin: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setAuthentication: (state, parameter) => {

      state.isAuthenticated = parameter.payload

    },
    setIsAdmin: (state, parameter) => {

      state.isAdmin = parameter.payload

    }

  },

})

// Action creators are generated for each case reducer function
export const { setAuthentication, setIsAdmin } = userSlice.actions

export default userSlice.reducer

