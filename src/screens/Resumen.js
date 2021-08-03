import React from 'react';
import {View,Text,Button} from 'react-native';

const Resumen = ({ navigation }) =>{
  return(
    <View style={{flex:1,paddingTop:35,alignItems:'center'}}>
      <Text>RESUMEN</Text>
      <Button
        title='Volver al inicio'
        onPress={() => navigation.navigate('Inicio')}
      />
    </View>
  );
};

export default Resumen;