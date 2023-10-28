import { configureStore } from '@reduxjs/toolkit'

import userSlice from "./userSlice"
import aiPageSlice from './aiPageSlice';
import setSearch from './setSearch';

export default configureStore({
    reducer:{
        user: userSlice,
        aiPage: aiPageSlice,
        search:setSearch
    }
});
