import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  user: '',
  isAuthenticated: false,
  error: false,
  modal: false,
  modalMessage: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setAuthentication: (state, parameter) => {

      state.isAuthenticated = parameter.payload

    },

    setModalStatus: (state, content) => {

      state.modal = content.payload.modal
      state.modalMessage = content.payload.modalMessage
    }

  },

})

// Action creators are generated for each case reducer function
export const { setModalStatus, setAuthentication } = userSlice.actions

export default userSlice.reducer

