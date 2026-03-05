import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Svg, { Path, Circle } from 'react-native-svg';

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
            <Text style={styles.sub}>Category limits coming soon</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#fff' },
    title: { fontSize: 32, fontWeight: 'bold', marginTop: 40 },
    sub: { fontSize: 16, color: '#888', marginTop: 8 },
  });