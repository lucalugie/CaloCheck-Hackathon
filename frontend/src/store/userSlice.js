import {createSlice} from "@reduxjs/toolkit"

const initState ={
    type: "",
    userlineId: "",
    displayName: "",
    pictureUrl: "",
    gender: "",
    weight: "",
    height: "",
    cal: "",
    bmi: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        setType: (state, action) => {
            state.type = action.payload
        },
        setLineID: (state, action) => {
            state.userlineId = action.payload
        },
        setDisplayName: (state, action) => {
            state.displayName = action.payload
        },
        setPictureUrl: (state, action) => {
            state.pictureUrl = action.payload
        },
        setGender: (state, action) => {
            state.gender = action.payload
        },
        setWeight: (state, action) => {
            state.weight = action.payload
        },
        setHeight: (state, action) => {
            state.height = action.payload
        },
        setCal: (state, action) => {
            state.cal = action.payload
        },
        setBmi: (state, action) => {
            state.bmi = action.payload
        }
    }
}


)

export const {setType, setLineID, setDisplayName, setPictureUrl, setGender, setWeight, setHeight, setCal, setBmi} = userSlice.actions
export default userSlice.reducer