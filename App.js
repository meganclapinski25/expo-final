import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import BudgetScreen from './screens/BudgetScreen';
import { store } from './store';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Transactions: 'list-outline',
              Dashboard: 'home-outline',
              Budget: 'pie-chart-outline',
            };
            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#aaa',
        })}>
          <Tab.Screen name="Transactions" component={TransactionsScreen} />
          <Tab.Screen name="Dashboard" component={HomeScreen} />
          <Tab.Screen name="Budget" component={BudgetScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
