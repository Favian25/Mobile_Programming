import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './components/HomeScreen';
import RoomScreen from './components/RoomScreen';
import BookingScreen from './components/BookingScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Rooms"
          component={RoomScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bed-empty" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Booking"
          component={BookingScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar-edit" color={color} size={size} />
            ),
          }}
        />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
