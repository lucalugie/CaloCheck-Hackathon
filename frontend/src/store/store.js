import { configureStore } from '@reduxjs/toolkit'

import userSlice from "./userSlice"
import aiPageSlice from './aiPageSlice';

export default configureStore({
    reducer:{
        user: userSlice,
        aiPage: aiPageSlice
    }
});
