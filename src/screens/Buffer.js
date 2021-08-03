import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { Card } from 'react-native-paper';

//Maneja el estilo del buffer
const Buffer = ({ select, Icons }) => {
  return (
    <View style={styles.contenedor}>
      <Card style={styles.card}>
        <Text style={styles.title}>
          ID
          <Text style={{ color: '#3819E2' }}>{` ${select.id}`}</Text>
        </Text>

        <Text style={styles.subtitle}>
          Estado:
          <Text style={{ color: '#3819E2' }}>{` ${select.name}`}</Text>
        </Text>

        <Icon
          reverse
          iconStyle={{ color:'#F4F6F6' }}
          name={Icons[select.icono].icon}
          size={20}
          type={Icons[select.icono].type}
          color={Icons[select.icono].color}
          onPress={() => console.log('algo')}
        />
      </Card>
    </View>
  );
};

export default Buffer;
//Los estilos de los componentes del buffer
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignContent:'center',
  },
  title: {
    fontFamily: 'sketchup',
    fontSize: 30,
    color: '#00ACFF',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'coolvetica',
    fontSize: 10,
    color: '#00ACFF',
    textAlign: 'center',
  },
  card: {
    margin: 10,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor:'transparent;',
    borderRadius:0.5,
  },
});
