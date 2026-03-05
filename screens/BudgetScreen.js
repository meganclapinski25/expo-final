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

    const [budgets, setBudgets] = useState('')
    const {items} = useSelector(state => state.transactions);
    const [inputVal, setInputVal] = useState('');
const [editing, setEditing] = useState(false);

    const byCategory = items.reduce((acc,t) =>{
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {});

    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Budget</Text>
            {total > 0 ? (
                <View style={{ alignItems: 'center', marginVertical: 24 }}>
                    <PieChart
                    donut
                    data={Object.entries(byCategory).map(([cat, amount]) => ({
                        value: amount,
                        color: colors[cat] || '#ccc',
                        text: cat,
                    }))}
                    innerCircleColor="#fff"
                    centerLabelComponent={() => (
                        <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>${total.toFixed(0)}</Text>
                        <Text style={{ fontSize: 12, color: '#888' }}>spent</Text>
                        </View>
                    )}
                    />
                </View>
            ):(
                <Text style={styles.sub}>Add transactions to see your chart</Text>
            )}
            {categories.map(cat =>(
                <View key={cat} style={styles.row}>
                    <View style={[styles.dot, { backgroundColor: colors[cat] }]} />
                    <Text style={styles.cat}>{cat}</Text>
                    <Text style={styles.amount}>${(byCategory[cat] || 0).toFixed(2)}</Text>
                    </View>
            ))}
        </View>
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