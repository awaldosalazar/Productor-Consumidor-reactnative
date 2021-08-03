import React, {useState,useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import Constants from 'expo-constants';
import * as Font from 'expo-font'; 

import Homescreen from './src/screens/Home';
import Router from './src/Router/Index';
import Semaforo from './src/screens/semaforos';
import Resumen from './src/screens/Splash';


const App = () => {
  const [carga,setCarga] = useState(false);
  //Se cargan las fuentes que seran utilizadas dentro de la app
  useEffect(() => {
    if(!carga){
      loadFonts();
    }
  });
//Funcion para cargar las fuentes
  const loadFonts = async() =>{
   await Font.loadAsync({
        'coolvetica': require('./src/assets/fonts/coolvetica.ttf'),
        'sketchup': require('./src/assets/fonts/SKETCHUP.ttf')
      });
      setCarga(true);
  }
  //Si no estan cargadas muestra la pantalla de carga y una vez que es listo manda a llamar el Router de la aplicacion la cual almacena un stack de pantallas que se encarga de mostrar la navegación de la aplicación
  return carga ? <Router /> : <ActivityIndicator style={{marginTop:360}} color="#00ACFF" />;
    
};

export default App;
