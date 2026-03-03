import { View, Text, StyleSheet} from 'react-native';

export default function HomeScreen(){
    return (
    <View style={styles.container}>
        <Text style={styles.label}> Balance</Text>
        <Text style={styles.balance}>$1,240.00</Text>
        
    </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  label: { fontSize: 16, color: '#888', marginTop: 40 },
  balance: { fontSize: 48, fontWeight: 'bold', color: '#000' },
  paydayBanner: { backgroundColor: '#4CAF50', borderRadius: 12, padding: 16, marginTop: 24 },
  paydayText: { color: '#fff', fontSize: 16 },
  card: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 16, marginTop: 16 },
  cardLabel: { fontSize: 14, color: '#888' },
  cardValue: { fontSize: 22, fontWeight: '600', marginTop: 4 },
});