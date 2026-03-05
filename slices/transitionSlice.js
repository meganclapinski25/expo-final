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
})





export const { addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;