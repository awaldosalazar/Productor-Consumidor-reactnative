import React,{useEffect,useState} from 'react';
import {View,Text,Button} from 'react-native';
import {Mutex, Semaphore, withTimeout} from 'async-mutex';

const initialValue = 1;

const Semaforo = () =>{
  useEffect(() => {
    //setTimeout(() => productor(),3000);
    //setTimeout(() => consumidor(),3000);
  })
  const semaphore = new Semaphore(initialValue);

  const productor = () =>{

    semaphore
    .acquire()
    .then(function([value, release]) {
        // ...
        setTimeout(() => console.log('semaforo 1'),5000);
        setTimeout(() => release(),10000);
        //release();
    });

  }

  const consumidor = () =>{

    semaphore
    .acquire()
    .then(function([value, release]) {
        // ...
        setTimeout(() => console.log('semaforo 2'),5000);
        setTimeout(() => release(),10000);
        //release();
    });
    
  }

  function getDatoRandom(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


  return(
    <View style={{flex:1,paddingTop:30,alignItems:'center'}}>
      <Text>SEMAFORO</Text>
      <Button
        title='semaforo 1'
        onPress={productor}
      />
      
      <Button
        title='semaforo 2'
        onPress={consumidor}
      />
    </View>
  );
}

export default Semaforo;