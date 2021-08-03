import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { Card } from 'react-native-paper';

const ViewIcons = ({ Icons }) => {
  return (
    <View style={styles.contenedor}>
      <Card style={styles.card}>
        <Text style={styles.title}>
          ID
          <Text style={{ color: '#3819E2' }}>{` ${Icons.id}`}</Text>
        </Text>

         <Text style={styles.subtitle}>
          Estado:
          <Text style={{ color: '#3819E2' }}>{` ${Icons.icon}`}</Text>
        </Text>

        <Icon
          reverse
          iconStyle={{ color:'#F4F6F6' }}
          name={Icons.icon}
          size={20}
          type={Icons.type}
          color={Icons.color}
          onPress={() => console.log('algo')}
        />
        
       

      </Card>
    </View>
  );
};

export default ViewIcons;

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
    backgroundColor:'trasparent',
    borderRadius:.5,
  },
});
