import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme';

export default function HomeScreen() {
  const { items } = useSelector(state => state.transactions);
  const [startingBalance, setStartingBalance] = useState('');
  const [displayBalance, setDisplayBalance] = useState(0);
  const [editing, setEditing] = useState(false);

  const totalSpent = items.reduce((sum, t) => sum + t.amount, 0);
  const currentBalance = (parseFloat(startingBalance) || 0) - totalSpent;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    AsyncStorage.getItem('startingBalance').then(val => {
      if (val) setStartingBalance(val);
    });
  }, []);

  useEffect(() => {
    animatedValue.addListener(({ value }) => setDisplayBalance(value));
    Animated.timing(animatedValue, {
      toValue: currentBalance,
      duration: 1200,
      useNativeDriver: false,
    }).start();
    return () => animatedValue.removeAllListeners();
  }, [currentBalance]);

  const handleSaveBalance = async () => {
    await AsyncStorage.setItem('startingBalance', startingBalance);
    setEditing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Balance</Text>
      <Text style={styles.balance}>${displayBalance.toFixed(2)}</Text>

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
  container: { flex: 1, padding: 24, backgroundColor: theme.background },
  label: { fontSize: 16, color: theme.subtext, marginTop: 40 },
  balance: { fontSize: 48, fontWeight: 'bold', color: theme.text, marginBottom: 8 },
  spent: { fontSize: 24, fontWeight: '600', color: theme.danger, marginBottom: 32 },
  input: { borderWidth: 1, borderColor: theme.inputBorder, borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 10, marginTop: 8 },
  btn: { backgroundColor: theme.accent, borderRadius: 10, padding: 14, alignItems: 'center' },
  btnText: { color: theme.background, fontWeight: '600', fontSize: 16 },
});
