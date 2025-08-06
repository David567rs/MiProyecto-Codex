// Archivo: SendHealthReport.js
import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import { API_URL } from '../../utils/constants';

const SendHealthReport = () => {
  const [email, setEmail] = useState('');
  const [specs, setSpecs] = useState(''); // estado para las especificaciones

  const sendReport = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Ingrese el correo del padre');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/emails/send-health-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentEmail: email,
          specifications: specs, // enviamos las especificaciones
        }),
      });
      if (res.ok) {
        Alert.alert('Éxito', 'Reporte enviado correctamente');
        setEmail('');
        setSpecs(''); // reseteamos el campo
      } else {
        const data = await res.json().catch(() => null);
        Alert.alert('Error', data?.message || 'No se pudo enviar el reporte');
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'No se pudo enviar el reporte');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20, textAlign: 'center' }}>
        Enviar Reporte de Salud
      </Text>

      <TextInput
        placeholder="Correo del padre"
        value={email}
        onChangeText={setEmail}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 8,
          paddingLeft: 10,
          marginBottom: 20,
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo para que el doctor agregue especificaciones */}
      <TextInput
        placeholder="Especificaciones del doctor"
        value={specs}
        onChangeText={setSpecs}
        multiline
        numberOfLines={4}
        style={{
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
          textAlignVertical: 'top', // para que el texto parta desde arriba
          height: 100,
        }}
      />

      <Button title="Enviar Reporte" onPress={sendReport} />
    </View>
  );
};

export default SendHealthReport;
