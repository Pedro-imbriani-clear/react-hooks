import React, {Fragment, useState} from 'react';

import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function App(){

  const [nome, setNome] = useState('Pedro');
  const [input, setInput] = useState('')

  function alteraNome(){
    setNome(input)
    setInput('')
  }

  return(
    <View style={styles.container}>
      <Text>{nome}</Text>
      <TouchableOpacity onPress={alteraNome} style={{backgroundColor: 'green'}}>
        <Text>Alterar Nome</Text>
      </TouchableOpacity>
      <TextInput placeholder={'nome'} value={input} onChangeText={(texto) => setInput(texto)}/>
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
