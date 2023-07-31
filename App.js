import React, { useState, useRef } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard} from 'react-native';
import api from './src/services/api';

export default function App(){
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);
  
  function limpar(){
    setCep('');
    setCepUser(null);
    inputRef.current.focus();
  }

  async function buscar(){
    if(cep == ''){
      alert('CEP Invalid');
      return;
    }

    try{
      const response = await api.get(`/${cep}/json`);
      setCepUser(response.data);
      Keyboard.dismiss();
    }catch(error){
      console.log(error);
    }
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput
        ref={inputRef}
        onChangeText={ (texto) => setCep(texto) }
        placeholder="Ex: 79003241"
        style={styles.input}
        keyboardType="numeric"
        value={cep}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#1d75cd' }]} onPress={ buscar }>
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#cd3e1d' }]} onPress={ limpar }>
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      { cepUser &&
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  text:{
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input:{
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  areaBtn:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  botao:{
   height: 50,
   justifyContent: 'center',
   padding: 15,
   alignItems: 'center',
   borderRadius: 5,
  },
  botaoText:{
    fontSize: 22,
    color:'#FFF',
    textAlign: 'center'
  },
  resultado:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  itemText:{
    fontSize: 22,
  }
});