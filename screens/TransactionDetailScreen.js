import { View, Text, StyleSheet } from 'react-native';

export default function TransactionDetailScreen({route}){
    const {item} = route.params;

    return(
        <View style={styles.container}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.amount}>-${item.amount.toFixed(2)}</Text>
        <Text style={styles.meta}>{item.category}</Text>
        <Text style={styles.meta}>{item.date}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#fff' },
    label: { fontSize: 28, fontWeight: 'bold', marginTop: 40 },
    amount: { fontSize: 40, fontWeight: 'bold', color: '#e53935', marginTop: 8 },
    meta: { fontSize: 16, color: '#888', marginTop: 8 },
  });