import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import BudgetScreen from './screens/BudgetScreen';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Transactions" component={TransactionsScreen} />
        <Tab.Screen name="Dashboard" component={HomeScreen} />
        <Tab.Screen name="Budget" component={BudgetScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


