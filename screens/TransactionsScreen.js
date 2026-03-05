import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addTransaction, loadTransactions } from '../slices/transactionSlice';

const dispatch = useDispatch();
const {item, status} = useSelector(state => state.transactions);
const [label, setLabel] = useState('');
const [amount, setAmount] = useState('');
const [category, setCategory] = useState('Food');
const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Other'];
export default function TransactionsScreen(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transactions</Text>
            <Text style={styles.sub}>Transactions will appear here</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', marginTop: 40 },
  sub: { fontSize: 16, color: '#888', marginTop: 8 },
});
