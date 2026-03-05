import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addTransaction, loadTransactions } from '../slices/transactionSlice';


export default function TransactionsScreen(){

    const dispatch = useDispatch();
    const {items , status} = useSelector(state => state.transactions);
    const [label, setLabel] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Other'];
    const handleAdd = async () => {
        if (!label || !amount) return;
        const newTransaction = {
          id: Date.now().toString(),
          label,
          amount: parseFloat(amount),
          category,
          date: new Date().toLocaleDateString(),
        };
        dispatch(addTransaction(newTransaction));
        const updated = [newTransaction, ...items];
        await AsyncStorage.setItem('transactions', JSON.stringify(updated));
        setLabel('');
        setAmount('');
      };

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Transactions</Text>
      
          {/* Inputs */}
          <TextInput style={styles.input} placeholder="Label" value={label} onChangeText={setLabel} />
          <TextInput style={styles.input} placeholder="Amount" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />
      
         {/* Category picker */}
                <View style={styles.chips}>
                {CATEGORIES.map(cat => (
                    <TouchableOpacity
                    key={cat}
                    style={[styles.chip, category === cat && styles.chipActive]}
                    onPress={() => setCategory(cat)}
                    >
                    <Text style={[styles.chipText, category === cat && styles.chipTextActive]}>{cat}</Text>
                    </TouchableOpacity>
                ))}
                </View>

                {/* Add button */}
                <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
                <Text style={styles.addBtnText}>+ Add Transaction</Text>
                </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', marginTop: 40 },
  sub: { fontSize: 16, color: '#888', marginTop: 8 },
});
