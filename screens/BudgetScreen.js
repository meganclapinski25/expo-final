import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { PieChart } from 'react-native-gifted-charts'


const categories = ['Food', 'Gas', 'Shopping', 'Bills', 'Other'];
const colors = {
    Food: '#FF6384', Gas: '#36A2EB',
    Shopping: '#FFCE56', Bills: '#4BC0C0', Other: '#9966FF',
  };




export default function BudgetScreen(){


    
    const {items} = useSelector(state => state.transactions);
    const total = items.reduce((sum, t) => sum + t.amount, 0);

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
     </View>
);
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#fff' },
    title: { fontSize: 32, fontWeight: 'bold', marginTop: 40 },
    sub: { fontSize: 16, color: '#888', marginTop: 8 },
});