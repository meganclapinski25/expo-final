import {View, Text, StyleSheet} from 'react-native';

export default function BudgetScreen(){
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