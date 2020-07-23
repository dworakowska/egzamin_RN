import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';

import HomeView from './Views/HomeView';
import DetailsView from './Views/DetailsView';
import BerriesView from './Views/BerriesView';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Pokemons" component={HomeView} />
    <Stack.Screen name="Details" component={DetailsView} />
  </Stack.Navigator>
);

const BerriesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Berries" component={BerriesView} />
  </Stack.Navigator>
);

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: () => {
            let imageUrl;
            if (route.name === 'Pokemons') {
              imageUrl = require('./images/Pika.png');
            } else {
              imageUrl = require('./images/Berries.png');
            }
            return <Image source={imageUrl} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Pokemons" component={HomeStack} />
        <Tab.Screen name="Berries" component={BerriesStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
