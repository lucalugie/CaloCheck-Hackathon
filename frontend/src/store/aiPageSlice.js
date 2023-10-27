import {createSlice} from "@reduxjs/toolkit"

const initState ={
    name: "",
    url: "",
    loading: true
}

export const userSlice = createSlice({
    name: 'aiPage',
    initialState: initState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setUrl: (state, action) => {
            state.url = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
        
    }
}


)

export const {setName, setUrl, setLoading } = userSlice.actions
export default userSlice.reducer