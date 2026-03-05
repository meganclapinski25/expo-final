import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadTransactions } from '../slices/transactionSlice';

export default function TransactionsScreen(){

    const dispatch = useDispatch();
    const { items, status, error } = useSelector(state => state.transactions);

    useEffect(() => {
        dispatch(loadTransactions()); // load from AsyncStorage on mount
      }, []);
    
      if (status === 'loading') return <ActivityIndicator style={{ flex: 1 }} />;
      if (status === 'failed') return <Text>Error: {error}</Text>;


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transactions</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                onRefresh={() => dispatch(loadTransactions())}
                refreshing={status === 'loading'}
                renderItem={({ item }) => (
                <View style={styles.row}>
                    <Text>{item.label}</Text>
                    <Text>${item.amount}</Text>
                </View>
                )}
                ListEmptyComponent={<Text style={styles.sub}>No transactions yet</Text>}
            />
        </View>
    )
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', marginTop: 40 },
  sub: { fontSize: 16, color: '#888', marginTop: 8 },
});