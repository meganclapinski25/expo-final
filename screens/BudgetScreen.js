import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { PolarChart, Pie } from 'victory-native';
import 'react-native-reanimated';

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
                <View style ={{height:220}}>
                    <PolarChart
                        data={Object.entries(byCategory).map(([cat,amount]) =>({
                            label:cat,
                            value:amount,
                            color:colors[cat] || '#ccc',
                        }))}
                        labelKey="label"
                        valueKey="value"
                        colorKey = "color"
                        >
                        <Pie.Chart innerRadius={60}/>
                    </PolarChart>
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