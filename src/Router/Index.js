import * as React from 'react';
import { View, Button, Text, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Path 
//Son las pantallas en las cuales se puede navegar dentro de la app
import Inicio from '../screens/Inicio';
import Home from '../screens/Home';
import Resumen from '../screens/Resumen';
import Splash from '../screens/Splash';

//Se crea el stack donde sera almacenadas todas las pantallas de la aplicación
const Stack = createStackNavigator();

//En esta funcion se crea una navegacion la cual va contener las pantallas dentro del stack
const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="Inicio"
        component={Inicio}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Resumen"
        component={Resumen}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
}

//Para poder utilizar la navegacion se tiene que llamar al contenedor del cual solo se puede ejecutar uno por aplicación
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
