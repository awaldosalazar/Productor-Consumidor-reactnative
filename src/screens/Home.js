import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Icon, Button } from 'react-native-elements';
import { Card } from 'react-native-paper';
import { Mutex, Semaphore, withTimeout } from 'async-mutex';

import { UserIcons, SemaforoIcons, Icons } from '../data/Icons';
//path al estilo del buffer
import Buffer from './Buffer';
//path a los datos del buffer
import { Bufferapp } from '../data/Buffer';

//Variables para el funcionamiento del algortimo
let contadorBuffer = 0;
var posicionProductor = 1;
var posicionConsumidor = 1;
//InitialValue inicializa la cantidad de semaforos permitidos por la app
var initialValue = 1;
//Detiene los procesos y mata los hilos del callback
var detener = 'no';
//Maneja la cantidad de espera aleatoria del productor y consumidor
const maximo = 5;
const minimo = 3;

const Home = ({ navigation }) => {
  const semaphore = new Semaphore(initialValue); //Se crea el semaforo de la libreria async-mutex para es6

  useEffect(() => {
    //Antes que comience se carga un buffer local para poder realizar las modificaciones
    setBufferl(Bufferapp);
  }, []);

  //Para este problema se crearon 2 funciones principales las cuales son productorFunction y consumidorFunction las cuales se encargan de manejar toda la aplicacion

  const productorFunction = (time) => {
    if (detener === 'si') {
      //Evalua si la app ya se tiene que detener
      return; // Termina la función
    }
    //Evalia si time es igual a 0 entonces tiene que despertar
    if (time === 0) {
      //Manda a llamar el semaforo y se ocupa mediante el metodo acquire(), en este caso se programo mediante una promesa, en la cual le decimos que vamos a esperar un resultado con el cual vamos a trabajar
      semaphore.acquire().then(
        /*Madamos a llamar la promesa*/ function (
          [
            value,
            release,
          ] /*La funcion anterior es lo que nos regresara el llamado al semaforo */
        ) {
          //Las siguientes manejan la vista del usuario
          setSemaforoproductor(false);
          setSemaforoconsumidor(true);
          setProductos(false);

          if (contadorBuffer != 20) {
            //El if evalua que el buffer no este lleno
            if (posicionProductor === 21) {
              //Evaluamos que la posicion del productor no este al final, de ser asi se regresa al inicio
              posicionProductor = 1;
            }
            //La funcion modifica se encarga de modificar el dato dentro del buffer y actualizar la vista
            modifica(posicionProductor, getDatoRandom(12, 1), 'ocupado');
            //Las siguientes variables se manejan para el funcionamiento del algoritmo se aumenta la posición del productor y la cantidad del buffer
            posicionProductor++;
            contadorBuffer++;
            setVistabuffer(contadorBuffer);
            setVistaProductor(posicionProductor);
            //Para demostrar el buen funcionamiento del semaforo se pone un sleep de 3 segundos por si llega el consumidor se vea que el semaforo espere mientras se libera el semaforo
            setTimeout(() => {
              //Regresamos las variables al estado inicial
              setSemaforoconsumidor(false);
              setProductos(true);
              productorFunction(getDatoRandom(maximo, minimo));
              //Se libera el semaforo
              release();
            }, 3000);
          } else {
            //si el buffer esta lleno lo mandamos a dormir
            setTimeout(() => {
              setProductos(true);
              productorFunction(getDatoRandom(maximo, minimo));
              release();
            }, 1000);
          }
        }
      );
    } else {
      //Si time es mayor a 0 entonces se actualiza el contador a la vista del usuario
      --time;
      setTimeproductor(time);
      setTimeout(() => productorFunction(time), 1000);
    }
  };

  const consumidorFunction = (time) => {
    if (detener === 'si') {
      //Evalua si la app ya se tiene que detener
      return;// Termina la función
    }
    //Evalia si time es igual a 0 entonces tiene que despertar
    if (time === 0) {
      //Manda a llamar el semaforo y se ocupa mediante el metodo acquire(), en este caso se programo mediante una promesa, en la cual le decimos que vamos a esperar un resultado con el cual vamos a trabajar
      semaphore.acquire().then/*Madamos a llamar la promesa*/(function ([value, release] /*La funcion anterior es lo que nos regresara el llamado al semaforo */) {
         //Las siguientes manejan la vista del usuario
        setSemaforoconsumidor(false);
        setSemaforoproductor(true);
        setConsumidors(false);
        if (contadorBuffer != 0) {//El if evalua que el buffer no este vacio
          if (posicionConsumidor === 21) {//Evaluamos que la posicion del consumidor no este al final, de ser asi se regresa al inicio
            posicionConsumidor = 1;
          }
          //La funcion modifica se encarga de modificar el dato dentro del buffer y actualizar la vista
          modifica(posicionConsumidor, 13, 'empty');
          seleccionarItem(posicionConsumidor);
           //Las siguientes variables se manejan para el funcionamiento del algoritmo se aumenta la posición del consumidor y disminuye la cantidad del buffer
          posicionConsumidor++;
          contadorBuffer--;
          setVistabuffer(contadorBuffer);
          setVistaconsumidor(posicionConsumidor);
          //Para demostrar el buen funcionamiento del semaforo se pone un sleep de 3 segundos por si llega el productor se vea que el semaforo espere mientras se libera el semaforo
          setTimeout(() => {
            //Regresamos las variables al estado inicial
            setSemaforoproductor(false);
            setConsumidors(true);
            consumidorFunction(getDatoRandom(maximo, minimo));
            //Se libera el semaforo
            release();
          }, 3000);
        } else {
          //si el buffer esta Vacio lo mandamos a dormir
          setTimeout(() => {
            setSemaforoconsumidor(true);
            setSemaforoproductor(false);
            setConsumidors(true);
            consumidorFunction(getDatoRandom(maximo, minimo));
            release();
          }, 1000);
        }
      });
    } else {
      //Si time es mayor a 0 entonces se actualiza el contador a la vista del usuario
      --time;
      setTimeconsumidor(time);
      setTimeout(() => consumidorFunction(time), 1000);
    }
  };

  /* Manejan la vistas de la aplicación */
  const [timeProductor, setTimeproductor] = useState(0);
  const [timeconsumidor, setTimeconsumidor] = useState(0);
  const [semaforoproductor, setSemaforoproductor] = useState(false);
  const [semaforoconsumidor, setSemaforoconsumidor] = useState(false);
  const [productors, setProductos] = useState(true);
  const [consumidors, setConsumidors] = useState(true);
  const [vistaproductor, setVistaProductor] = useState(1);
  const [vistaconsumidor, setVistaconsumidor] = useState(1);
  const [vistabuffer, setVistabuffer] = useState(0);
  const [play, setPlay] = useState(false);
  const [bufferl, setBufferl] = useState();
  const [bufferc, setBufferc] = useState([]);
  const [random, setRandom] = useState(0);

  const getDatoRandom = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const seleccionarItem = (id) => {
    // Extraer Producto y meterlo al carrito
    const item = bufferl.filter((producto) => producto.id === id)[0];
    setBufferc([...bufferc, item]);
  };
  //Modifica el dato dentro del buffer el cual recibe 3 parametros, el id del dato (select), numero de icono (number) y el estado, ocupado o vacio (estado)
  const modifica = (select, number, estado) => {
    const newdato = bufferl.map((dato) => {
      if (dato.id === select) {
        return {
          ...dato,
          icono: number,
          name: estado,
        };
      }
      return dato;
    });

    setBufferl(newdato);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.title}>Productor</Text>
          <Icon
            reverse
            iconStyle={{ color: '#F4F6F6' }}
            name={productors ? UserIcons[2].icon : UserIcons[0].icon}
            type={UserIcons[0].type}
            color={productors ? UserIcons[2].color : UserIcons[0].color}
            onPress={() => console.log('hello')}
          />
          <Text style={styles.subtitle}>
            {productors ? `Durmiendo... ${timeProductor}` : `Produciendo...`}
          </Text>
        </View>

        <View style={styles.consumidor}>
          <Text style={styles.title}>consumidor</Text>
          <Icon
            reverse
            iconStyle={{ color: '#F4F6F6' }}
            name={consumidors ? UserIcons[2].icon : UserIcons[1].icon}
            type={UserIcons[0].type}
            color={consumidors ? UserIcons[2].color : UserIcons[1].color}
            onPress={() => console.log('hello')}
          />
          <Text style={styles.subtitle}>
            {consumidors ? `Durmiendo... ${timeconsumidor}` : `Consumiendo...`}
          </Text>
        </View>

        <View style={{ alignSelf: 'center' }}>
          <Card style={styles.card}>
            <Text style={styles.titlecard}>STATUS BUFFER</Text>
            <Text style={styles.subtitlecard}>SEMAFOROS</Text>
            <View style={{ marginLeft: 30 }}>
              <Icon
                reverse
                iconStyle={{ color: '#F4F6F6' }}
                name={
                  semaforoproductor
                    ? SemaforoIcons[1].icon
                    : SemaforoIcons[0].icon
                }
                type={SemaforoIcons[0].type}
                color={
                  semaforoproductor
                    ? SemaforoIcons[1].color
                    : SemaforoIcons[0].color
                }
                onPress={() => console.log('hello')}
              />
              <Text style={styles.subtitle}>
                {semaforoproductor ? 'no disponible' : 'disponible'}
              </Text>
            </View>
            <View style={{ marginLeft: 300, marginTop: -80 }}>
              <Icon
                reverse
                iconStyle={{ color: '#F4F6F6' }}
                name={
                  semaforoconsumidor
                    ? SemaforoIcons[1].icon
                    : SemaforoIcons[0].icon
                }
                type={SemaforoIcons[0].type}
                color={
                  semaforoconsumidor
                    ? SemaforoIcons[1].color
                    : SemaforoIcons[0].color
                }
                onPress={() => console.log('hello')}
              />
              <Text style={styles.subtitle}>
                {semaforoconsumidor ? 'no disponible' : 'disponible'}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'sketchup',
                  color: '#00ACFF',
                  fontSize: 30,
                }}>
                {`Posición Productor`}
                <Text
                  style={{
                    fontFamily: 'coolvetica',
                  }}>{`: [*${vistaproductor}*]`}</Text>
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'sketchup',
                  color: '#00ACFF',
                  fontSize: 30,
                }}>
                {`Posición Consumidor`}
                <Text
                  style={{
                    fontFamily: 'coolvetica',
                  }}>{`: [*${vistaconsumidor}*]`}</Text>
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'sketchup',
                  color: '#00ACFF',
                  fontSize: 30,
                }}>
                {`Datos en Buffer`}
                <Text
                  style={{
                    fontFamily: 'coolvetica',
                  }}>{`: [*${vistabuffer}*]`}</Text>
              </Text>
            </View>
          </Card>
        </View>

        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <Text style={styles.titleBuffer}>BUFFER ACTUAL</Text>
          <FlatList
            refreshing={true}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={bufferl}
            renderItem={({ item }) => <Buffer select={item} Icons={Icons} />}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={{ margin: 10 }}>
          <Button
            icon={
              <Icon
                name="chess"
                type="font-awesome-5"
                size={20}
                color="white"
              />
            }
            title="  Comenzar"
            loading={play}
            onPress={() => {
              setPlay(true);
              detener = 'no';
              productorFunction(getDatoRandom(maximo, minimo));
              consumidorFunction(getDatoRandom(maximo, minimo));
            }}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button
            icon={
              <Icon
                name="hand-paper"
                type="font-awesome-5"
                size={20}
                color="white"
              />
            }
            title="  Detener"
            onPress={() => {
              setPlay(false);
              setVistaProductor(1);
              setVistaconsumidor(1);
              setVistabuffer(0);
              setSemaforoproductor(false);
              setSemaforoconsumidor(false);
              setProductos(true);
              setConsumidors(true);
              posicionProductor = 1;
              posicionConsumidor = 1;
              contadorBuffer = 0;
              setTimeproductor(0);
              setTimeconsumidor(0);
              detener = 'si';
              setBufferl(Bufferapp);
            }}
          />
        </View>

        <View style={{ margin: 10 }}>
          <Button
            icon={
              <Icon
                name="hand-point-left"
                type="font-awesome-5"
                size={20}
                color="white"
              />
            }
            title="  Regresar al inicio"
            loading={play}
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: 'rgba(169, 204, 227  ,.4)',
  },
  card: {
    width: 400,
    height: 300,
    marginTop: 10,
    backgroundColor: 'rgba(209, 242, 235,0.6)',
    borderRadius: 0.5,
  },
  titlecard: {
    fontFamily: 'sketchup',
    fontSize: 40,
    color: '#00ACFF',
    marginLeft: 100,
  },
  consumidor: {
    marginTop: -115,
    marginLeft: 225,
  },
  subtitle: {
    fontFamily: 'coolvetica',
    fontSize: 15,
    color: '#BB8FCE',
  },
  subtitlecard: {
    fontFamily: 'sketchup',
    fontSize: 25,
    color: '#00ACFF',
    marginLeft: 150,
  },
  title: {
    fontFamily: 'sketchup',
    fontSize: 25,
    color: '#00ACFF',
  },
  titleBuffer: {
    fontFamily: 'sketchup',
    fontSize: 35,
    color: '#00ACFF',
  },
});
