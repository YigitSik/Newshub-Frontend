import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    modalStatus: false,
    modalMessage: "",
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {

        setModalStatus: (state, content) => {

            console.log(content);
            state.modalStatus = content.payload.modalStatus
            state.modalMessage = content.payload.modalMessage
        }

    },

})

// Action creators are generated for each case reducer function
export const { setModalStatus } = modalSlice.actions

export default modalSlice.reducer

