import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const SendMessage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://YOUR_BACKEND_URL/whatsapp/send-message', {
        phoneNumber,
        message,
      });

      if (response.status === 200) {
        Alert.alert('Mensaje enviado', 'El mensaje se envió correctamente.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar el mensaje.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Enviar Mensaje de WhatsApp</Text>
      <TextInput
        placeholder="Número de Teléfono"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 10,
        }}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Mensaje"
        value={message}
        onChangeText={(text) => setMessage(text)}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          paddingLeft: 10,
        }}
      />
      <Button title="Enviar Mensaje" onPress={sendMessage} />
    </View>
  );
};

export default SendMessage;
