import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const loadTransactions = createAsyncThunk(
    'transactions/load', async()=>{
        const data = await AsyncStorage.getItem('transactions');
        return data ? JSON.parse(data) : [];
    }
);

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        items: [],
        status: 'idle', 
        error: null,
      },
      reducers: {
        addTransaction: (state, action) => {
          state.items.unshift(action.payload); // adds to top of list
        },
        removeTransaction: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
},
        extraReducers: (builder) => {
            builder
            .addCase(loadTransactions.pending, (state) => { state.status = 'loading'; })
            .addCase(loadTransactions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(loadTransactions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
        },

});

export const { addTransaction, removeTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;

