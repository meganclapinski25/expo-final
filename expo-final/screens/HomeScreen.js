import { View, Text, StyleSheet} from 'react-native';

export default function HomeScreen(){
    return (
    <View style={styles.container}>
        <Text style={styles.greeting}>Good Morning 👋</Text>
        <Text style={styles.date}>Monday, Feb 24</Text>

        <Text style={styles.sectionTitle}>Today's Habits</Text>
        <Text style={styles.placeholder}>2 of 3 completed</Text>

        <Text style={styles.sectionTitle}>Today's Mood</Text>
        <Text style={styles.placeholder}>😊 Feeling good</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#fff',
      marginTop: 60,
    },
    greeting: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#1A1A2E',
    },
    date: {
      fontSize: 14,
      color: '#999',
      marginBottom: 32,
      marginTop: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#1A1A2E',
      marginBottom: 8,
      marginTop: 24,
    },
    placeholder: {
      fontSize: 16,
      color: '#666',
    },
  });