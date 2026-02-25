import { View, Text, StyleSheet } from 'react-native';

export default function HabitsScreen(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Habits</Text>
            <Text style={styles.item}>💧 Drink Water</Text>
            <Text style={styles.item}>🚶 Morning Walk</Text>
            <Text style={styles.item}>📚 Read 10 pages</Text>
        </View>
    )
}const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 24,
      marginTop: 60,
    },
    item: {
      fontSize: 18,
      marginBottom: 12,
      color: '#333',
    },
  });