import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Button, Image, Input, TabView } from '@rneui/themed';
import axios from 'axios'; 
import { API_URL } from '../../utils/constants'; 

const TabEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendEmail = async () => {
    try {
      const response = await axios.post(`${API_URL}/emails/send-recovery-code`, { email });
      if (response.data.success) {
        Alert.alert('Código enviado', 'Revisa tu correo electrónico para el código de recuperación.');
        navigation.navigate('entercode', { email });
      } else {
        Alert.alert('Error', 'No se pudo enviar el correo. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar correo:', error);
      console.log(email);
      Alert.alert('Error', 'Ocurrió un error al enviar el correo. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <TabView.Item style={{ flex: 1 }}>
      <ScrollView keyboardDismissMode='interactive'>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 10 }}>Recuperar contraseña</Text>
          <Image source={require('../../../assets/icons/candado.png')} style={{ width: 130, height: 130 }} />
          <Text numberOfLines={2} style={{ paddingHorizontal: 20, textAlign: 'center', fontSize: 16 }}>
            Ingresa tu correo electrónico para poder recuperar tu cuenta
          </Text>
          <Input
            leftIcon={<Image source={require('../../../assets/icons/icons8-correo-100.png')} style={{ width: 30, height: 30 }} />}
            label='Correo'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
          />
          <Button
            onPress={handleSendEmail}
            title='Enviar'
            color='#48A2E2'
            containerStyle={{ width: '60%', borderRadius: 20 }}
            titleStyle={{ fontWeight: 'bold' }}
          />
        </View>
      </ScrollView>
    </TabView.Item>
  );
};

export default TabEmail;
