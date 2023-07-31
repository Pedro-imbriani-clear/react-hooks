import React, {Fragment, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function App(){

  const [nome, setNome] = useState('');
  const [input, setInput] = useState('')

  useEffect(() => {
    async function getStorage(){
      const nomeStorage = await AsyncStorage.getItem('nome');
      if(nomeStorage !== null){ 
        setNome(nomeStorage)
      }   
    }
    getStorage()
  },[])

  useEffect(() => {
    async function saveStorage(){
      await AsyncStorage.setItem('nome', nome)
    }
    saveStorage()
  }, [nome])

  function alteraNome(){
    setNome(input);
    setInput('');
  }

  const letrasNome = useMemo(() => {console.log(nome.length)}, [nome])

  return(
    <View style={styles.container}>
      <Text>{nome}</Text>
      <TouchableOpacity onPress={() => alteraNome()} style={{backgroundColor: 'green'}}>
        <Text>Alterar Nome</Text>
      </TouchableOpacity>
      <TextInput placeholder={'nome'} value={input} onChangeText={(texto) => setInput(texto)}/>
      <Text>{letrasNome}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
