import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Share } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-gifted-charts';
import { theme } from '../theme';

const colors = {
  Food: '#FF6384', Gas: '#36A2EB',
  Shopping: '#FFCE56', Bills: '#4BC0C0', Other: '#9966FF',
};

export default function BudgetScreen() {
  const [budget, setBudgets] = useState('');
  const { items } = useSelector(state => state.transactions);
  const [inputVal, setInputVal] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('budget').then(val => {
      if (val) setBudgets(val);
    });
  }, []);

  const saveBudget = async () => {
    await AsyncStorage.setItem('budget', inputVal);
    setBudgets(inputVal);
    setEditing(false);
    setInputVal('');
  };

  const handleShare = async () => {
    const lines = Object.entries(byCategory)
      .map(([cat, amt]) => `${cat}: $${amt.toFixed(2)}`)
      .join('\n');
    await Share.share({
      message: `💰 My Budget Summary\n\nMonthly Budget: $${budget}\nTotal Spent: $${totalSpent.toFixed(2)}\nRemaining: $${remaining.toFixed(2)}\n\nBreakdown:\n${lines}`,
    });
  };

  const byCategory = items.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const totalSpent = items.reduce((sum, t) => sum + t.amount, 0);
  const remaining = (parseFloat(budget) || 0) - totalSpent;

  const chartData = Object.entries(byCategory).map(([cat, amount]) => ({
    value: amount,
    color: colors[cat] || '#ccc',
  }));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Budget</Text>

      {editing ? (
        <View style={styles.editRow}>
          <TextInput
            style={styles.input}
            placeholder="Monthly budget"
            keyboardType="numeric"
            value={inputVal}
            onChangeText={t => setInputVal(t.replace(/[^0-9.]/g, ''))}
          />
          <TouchableOpacity style={styles.saveBtn} onPress={saveBudget}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => { setEditing(true); setInputVal(budget); }}>
          <Text style={styles.setLimit}>
            {budget ? `Monthly budget: $${budget} — tap to edit` : 'Set monthly budget'}
          </Text>
        </TouchableOpacity>
      )}

      {budget ? (
        <Text style={[styles.remaining, remaining < 0 && styles.over]}>
          {remaining >= 0 ? `$${remaining.toFixed(0)} remaining` : `$${Math.abs(remaining).toFixed(0)} over budget`}
        </Text>
      ) : null}

      {chartData.length > 0 ? (
        <View style={styles.chart}>
          <PieChart
            donut
            data={chartData}
            innerCircleColor={theme.background}
            centerLabelComponent={() => (
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.centerAmt}>${totalSpent.toFixed(0)}</Text>
                <Text style={styles.centerSub}>spent</Text>
              </View>
            )}
          />
        </View>
      ) : (
        <Text style={styles.empty}>Add transactions to see your chart</Text>
      )}

      {Object.entries(byCategory).map(([cat, amount]) => (
        <View key={cat} style={styles.row}>
          <View style={[styles.dot, { backgroundColor: colors[cat] || '#ccc' }]} />
          <Text style={styles.cat}>{cat}</Text>
          <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
        <Text style={styles.shareBtnText}>Share Summary</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: theme.background },
  title: { fontSize: 32, fontWeight: 'bold', marginTop: 40, marginBottom: 16 },
  setLimit: { fontSize: 15, color: theme.subtext, marginBottom: 8 },
  editRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  input: { flex: 1, borderWidth: 1, borderColor: theme.inputBorder, borderRadius: 8, padding: 10, fontSize: 15 },
  saveBtn: { backgroundColor: theme.accent, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 16 },
  saveBtnText: { color: theme.background, fontWeight: '600' },
  remaining: { fontSize: 22, fontWeight: '600', color: theme.success, marginBottom: 16 },
  over: { color: theme.danger },
  chart: { alignItems: 'center', marginVertical: 24 },
  centerAmt: { fontSize: 20, fontWeight: 'bold', color: theme.text },
  centerSub: { fontSize: 12, color: theme.subtext },
  empty: { color: theme.subtext, marginTop: 40, textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: theme.border },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 10 },
  cat: { flex: 1, fontSize: 15, color: theme.text },
  amount: { fontSize: 15, fontWeight: '500', color: theme.text },
  shareBtn: { backgroundColor: theme.card, borderRadius: 10, padding: 12, alignItems: 'center', marginTop: 16, marginBottom: 40 },
  shareBtnText: { fontWeight: '600', fontSize: 15, color: theme.text },
});
