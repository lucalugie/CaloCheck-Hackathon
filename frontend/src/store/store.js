import { configureStore } from '@reduxjs/toolkit'

import userSlice from "./userSlice"
import aiPageSlice from './aiPageSlice';
import setSearch from './setSearch';
import barcodeSlice from './barcodeSlice';

export default configureStore({
    reducer:{
        user: userSlice,
        aiPage: aiPageSlice,
        search:setSearch,
        barcode: barcodeSlice
    }
});
