import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import BudgetScreen from './screens/BudgetScreen';
import { store } from './store';
import { Provider } from 'react-redux';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Transactions" component={TransactionsScreen} />
          <Tab.Screen name="Dashboard" component={HomeScreen} />
          <Tab.Screen name="Budget" component={BudgetScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


