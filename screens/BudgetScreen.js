import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-gifted-charts';


const categories = ['Food', 'Gas', 'Shopping', 'Bills', 'Other'];
const colors = {
    Food: '#FF6384', Gas: '#36A2EB',
    Shopping: '#FFCE56', Bills: '#4BC0C0', Other: '#9966FF',
  };




export default function BudgetScreen(){

    const [budget, setBudgets] = useState('')
    const {items} = useSelector(state => state.transactions);
    const [inputVal, setInputVal] = useState('');
    const [editing, setEditing] = useState(false);
    useEffect(() => {
        AsyncStorage.getItem('budget').then(val => {
          if (val) setBudgets(val);
        });
      }, []);
      const saveBudget = async () => {
        await AsyncStorage.setItem('monthlyBudget', inputVal);
        setMonthlyBudget(inputVal);
        setEditing(false);
        setInputVal('');
      };

      
      
    const byCategory = items.reduce((acc,t) =>{
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {});

    const totalSpent = items.reduce((sum, t) => sum +t.amount, 0);
    const remaining = (parseFloat(budget) || 0) - totalSpent;

    const chartData = Object.entries(byCategory).map(([cat, amount]) =>({
        value:amount,
        color:colors[cat] || '#ccc',
    }));

    
    return(
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
                    innerCircleColor="#fff"
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
        </ScrollView>
);
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#fff' },
    title: { fontSize: 32, fontWeight: 'bold', marginTop: 40 },
    sub: { fontSize: 16, color: '#888', marginTop: 8 },
    row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    dot: { width: 12, height: 12, borderRadius: 6, marginRight: 10 },
    cat: { flex: 1, fontSize: 15 },
    amount: { fontSize: 15, fontWeight: '500' },
});