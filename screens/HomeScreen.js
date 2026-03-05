import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen(){

  const {items} = useSelector(state => state.transactions);
  const [startingBalance, setStartingBalance] = useState('');
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('startingBalance').then(val => {
      if (val) setStartingBalance(val);
    });
  }, []);

  const totalSpent = items.reduce((sum, t) => sum + t.amount, 0);
  const currentBalance = (parseFloat(startingBalance) || 0) - totalSpent;

  const handleSaveBalance = async () => {
    await AsyncStorage.setItem('startingBalance', startingBalance);
    setEditing(false);
  };

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Current Balance</Text>
        <Text style={styles.balance}>${currentBalance.toFixed(2)}</Text>

        <Text style={styles.label}>Total Spent</Text>
        <Text style={styles.spent}>-${totalSpent.toFixed(2)}</Text>
        {editing ? (
      <>
        <TextInput
          style={styles.input}
          placeholder="Enter starting balance"
          keyboardType="numeric"
          value={startingBalance}
          onChangeText={(text) => setStartingBalance(text.replace(/[^0-9.]/g, ''))}
        />
        <TouchableOpacity style={styles.btn} onPress={handleSaveBalance}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
        </>
    ) : (
      <TouchableOpacity style={styles.btn} onPress={() => setEditing(true)}>
        <Text style={styles.btnText}>Set Starting Balance</Text>
      </TouchableOpacity>
    )}
      </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  label: { fontSize: 16, color: '#888', marginTop: 40 },
  balance: { fontSize: 48, fontWeight: 'bold', color: '#000', marginBottom: 8 },
  spent: { fontSize: 24, fontWeight: '600', color: '#e53935', marginBottom: 32 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 10, marginTop: 8 },
  btn: { backgroundColor: '#000', borderRadius: 10, padding: 14, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
