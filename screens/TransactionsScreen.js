import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addTransaction, loadTransactions, removeTransaction } from '../slices/transactionSlice';
import { theme } from '../theme';

const CATEGORIES = ['Food', 'Gas', 'Shopping', 'Bills', 'Other'];

export default function TransactionsScreen({ navigation }) {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.transactions);
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  useEffect(() => {
    dispatch(loadTransactions());
  }, []);

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

  const handleDelete = async (id) => {
    dispatch(removeTransaction(id));
    const updated = items.filter(item => item.id !== id);
    await AsyncStorage.setItem('transactions', JSON.stringify(updated));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>

      <TextInput style={styles.input} placeholder="Label" value={label} onChangeText={setLabel} />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={t => setAmount(t.replace(/[^0-9.]/g, ''))}
      />

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

      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Text style={styles.addBtnText}>+ Add Transaction</Text>
      </TouchableOpacity>

      {status === 'loading' && <ActivityIndicator style={{ marginTop: 20 }} />}
      {status === 'failed' && <Text style={{ color: theme.danger }}>Failed to load transactions</Text>}

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        onRefresh={() => dispatch(loadTransactions())}
        refreshing={status === 'loading'}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('TransactionDetail', { item })}>
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
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No transactions yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: theme.background },
  title: { fontSize: 32, fontWeight: 'bold', marginTop: 40, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: theme.inputBorder, borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 10 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: theme.inputBorder },
  chipActive: { backgroundColor: theme.accent, borderColor: theme.accent },
  chipText: { fontSize: 13, color: theme.subtext },
  chipTextActive: { color: theme.background },
  addBtn: { backgroundColor: theme.accent, borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 20 },
  addBtnText: { color: theme.background, fontWeight: '600', fontSize: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: theme.border },
  rowLabel: { fontSize: 16, fontWeight: '500', color: theme.text },
  rowMeta: { fontSize: 12, color: theme.subtext, marginTop: 2 },
  rowAmount: { fontSize: 16, fontWeight: '600', color: theme.danger },
  empty: { color: theme.subtext, marginTop: 24, textAlign: 'center' },
  deleteBtn: { color: theme.danger, fontSize: 16, fontWeight: '600' },
});
