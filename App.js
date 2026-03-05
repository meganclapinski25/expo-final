import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import BudgetScreen from './screens/BudgetScreen';
import { store } from './store';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadTransactions } from './slices/transactionSlice';
import * as Notifications from 'expo-notifications';

const Tab = createBottomTabNavigator();
function AppLoader() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTransactions());
    Notifications.requestPermissionsAsync();
  }, []);
  return null;
}
export default function App() {
  return (
    <Provider store={store}>
      <AppLoader/>
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
