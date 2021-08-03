import React from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';

import { Bufferapp } from '../data/Buffer';
import Buffer from './Buffer';
import ViewIcons from './ViewIcons';
import { Icons, UserIcons, SemaforoIcons } from '../data/Icons';

const Inicio = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          <Text style={{ color: '#3819E2' }}>PRODUCTOR </Text>
          CONSUMIDOR
        </Text>

        <View>
          <Text style={styles.buffer}>BUFFER ORIGINAL</Text>
          <FlatList
            refreshing={true}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Bufferapp}
            renderItem={({ item }) => <Buffer select={item} Icons={Icons} />}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View>
          <Text style={styles.buffer}>OOBJETOS PARA PRODUCTOR</Text>
          <FlatList
            refreshing={true}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Icons}
            renderItem={({ item }) => <ViewIcons Icons={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>
            <Text style={{ color: '#3819E2' }}>REPRESENTACIÓN DE </Text>
            ESTADOS
          </Text>
          <Text style={styles.titledesc}>Durmiendo</Text>
          <Icon
            reverse
            iconStyle={{ color: '#F4F6F6' }}
            name={UserIcons[2].icon}
            size={25}
            type={UserIcons[2].type}
            color={UserIcons[2].color}
            onPress={() =>
              Alert.alert(
                `DURMIENDO`,
                `ESTE ICONO REPRESENTA QUE SE ENCUENTRA DURMIENDO PRODUCTOR/CONSUMIDOR`
              )
            }
          />
          <View style={{ marginTop: -105, marginRight: 170 }}>
            <Text style={styles.titledesc}>Productor</Text>
            <Icon
              reverse
              iconStyle={{ color: '#F4F6F6' }}
              name={UserIcons[0].icon}
              size={25}
              type={UserIcons[0].type}
              color={UserIcons[0].color}
              onPress={() =>
                Alert.alert(`PRODUCTOR`, `ESTE ICONO REPRESENTA AL PRODUCTOR`)
              }
            />
          </View>
          <View style={{ marginTop: -105, marginLeft: 180 }}>
            <Text style={styles.titledesc}>Consumidor</Text>
            <Icon
              reverse
              iconStyle={{ color: '#F4F6F6' }}
              name={UserIcons[1].icon}
              size={25}
              type={UserIcons[1].type}
              color={UserIcons[1].color}
              onPress={() =>
                Alert.alert(`CONSUMIDOR`, `ESTE ICONO REPRESENTA AL CONSUMIDOR`)
              }
            />
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>
            <Text style={{ color: '#3819E2' }}>REPRESENTACIÓN DE </Text>
            SEMAFOROS
          </Text>
          <Text style={styles.titledesc}>SEMAFORO DISPONIBLE</Text>
          <Icon
            reverse
            iconStyle={{ color: '#F4F6F6' }}
            name={SemaforoIcons[0].icon}
            size={25}
            type={SemaforoIcons[0].type}
            color={SemaforoIcons[0].color}
            onPress={() =>
              Alert.alert(`DISPONIBLE`, `EL SEMAFORO ESTA DISPONIBLE`)
            }
          />
          <Text style={styles.titledesc}>SEMAFORO OCUPADO</Text>
          <Icon
            reverse
            iconStyle={{ color: '#F4F6F6' }}
            name={SemaforoIcons[1].icon}
            size={25}
            type={SemaforoIcons[1].type}
            color={SemaforoIcons[1].color}
            onPress={() =>
              Alert.alert(`PRODUCTOR`, `ESTE ICONO REPRESENTA AL PRODUCTOR`)
            }
          />
        </View>
        <Button title="INICIAR" onPress={() => navigation.navigate('Home')} />
      </ScrollView>
    </View>
  );
};

export default Inicio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor:'rgba(169, 204, 227  ,.4)'
  },
  title: {
    textAlign: 'center',
    fontFamily: 'sketchup',
    fontSize: 30,
    color: '#00ACFF',
  },
  titledesc: {
    textAlign: 'center',
    fontFamily: 'coolvetica',
    fontSize: 15,
    color: '#00ACFF',
    marginTop: 20,
  },
  buffer: {
    textAlign: 'center',
    fontFamily: 'coolvetica',
    fontSize: 25,
    color: '#00ACFF',
    marginTop: 20,
  },
});
