import {createSlice} from "@reduxjs/toolkit"

const initState ={
    sku: "",
    status: false,
}

export const barcodeSlice = createSlice({
    name: 'barcode',
    initialState: initState,
    reducers: {
        setSku: (state, action) => {
            state.sku = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        }
        
    }
}


)

export const {setSku, setStatus } = barcodeSlice.actions
export default barcodeSlice.reducer