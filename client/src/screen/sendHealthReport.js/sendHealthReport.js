import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import { API_URL } from '../../utils/constants';

const SendHealthReport = () => {
  const [email, setEmail] = useState('');

  const sendReport = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Ingrese el correo del padre');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/emails/send-health-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parentEmail: email }),
      });
      if (res.ok) {
        Alert.alert('Éxito', 'Reporte enviado correctamente');
        setEmail('');
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
      <Button title="Enviar Reporte" onPress={sendReport} />
    </View>
  );
};

export default SendHealthReport;