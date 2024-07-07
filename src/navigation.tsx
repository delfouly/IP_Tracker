import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import MarketScreen from './screens/MarketScreen';
import {SharedContext} from './SharedContext';

const Tab = createBottomTabNavigator();

export function MyTabs() {
  const {selectedItem} = useContext(SharedContext);
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          initialParams={selectedItem}
        />
        <Tab.Screen name="Market Data" component={MarketScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
