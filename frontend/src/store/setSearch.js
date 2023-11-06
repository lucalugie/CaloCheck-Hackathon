import {createSlice} from "@reduxjs/toolkit"

const initState ={
    tableData: [],
    loading: true
}

export const searchSlice = createSlice({
    name: 'search',
    initialState: initState,
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
        
    }
}


)

export const {setTableData, setLoading } = searchSlice.actions
export default searchSlice.reducer