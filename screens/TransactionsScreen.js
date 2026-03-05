import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addTransaction, loadTransactions, removeTransaction } from '../slices/transactionSlice';


export default function TransactionsScreen(){

    const dispatch = useDispatch();
    const {items , status} = useSelector(state => state.transactions);
    const [label, setLabel] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const CATEGORIES = ['Food', 'Gas', 'Shopping', 'Bills', 'Other'];
    // explain handleADD 
    
    const handleAdd = async () => {
        if (!label || !amount) return;
        const newTransaction = {
          id: Date.now().toString(),
          label,
          amount: parseFloat(amount),
          category,
          date: new Date().toLocaleDateString(),
        };

    const handleDelete = async(id) => {
      dispatch(removeTransaction(id));
      const updated = items.filter(item => item.id !== id);
      await AsyncStorage.setItem('transactions', JSON.stringify(updated));
    }
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
          <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
      
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
            <FlatList
            data={items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
            <View style={styles.row}>
                <View>
                    <Text style={styles.rowLabel}>{item.label}</Text>
                    <Text style={styles.rowMeta}>{item.category} · {item.date}</Text>
                </View>
                <Text style={styles.rowAmount}>-${item.amount.toFixed(2)}</Text>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Text style={styles.deleteBtn}>✕</Text>
                </TouchableOpacity>
            </View>
            )}
            ListEmptyComponent={<Text style={styles.empty}>No transactions yet</Text>}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#fff' },
    title: { fontSize: 32, fontWeight: 'bold', marginTop: 40, marginBottom: 16 },
    input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 10 },
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
    chip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: '#ddd' },
    chipActive: { backgroundColor: '#000', borderColor: '#000' },
    chipText: { fontSize: 13, color: '#555' },
    chipTextActive: { color: '#fff' },
    addBtn: { backgroundColor: '#000', borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 20 },
    addBtnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    rowLabel: { fontSize: 16, fontWeight: '500' },
    rowMeta: { fontSize: 12, color: '#888', marginTop: 2 },
    rowAmount: { fontSize: 16, fontWeight: '600', color: '#e53935' },
    empty: { color: '#888', marginTop: 24, textAlign: 'center' },
    deleteBtn: { color: '#e53935', fontSize: 16, fontWeight: '600' },
  });
