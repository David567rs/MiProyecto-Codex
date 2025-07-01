import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Alert } from 'react-native';
import { Button, Image } from '@rneui/themed';
import axios from 'axios';
import { API_URL } from "../../utils/constants";

const Notifications = ({ route, navigation }) => {
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [childId, setChildId] = useState('');  // Campo para ingresar el childId
  const [childDataFetched, setChildDataFetched] = useState(false); // Estado para saber si se han obtenido datos del niño

  const fetchVaccinationData = async () => {
    try {
      const response = await axios.get(`${API_URL}/parents/child/${childId}`);
      setNotifications(response.data.notifications);
      setChildDataFetched(true); // Marcar que los datos se han obtenido
    } catch (error) {
      console.error('Error fetching vaccination data:', error);
    }
  };

  const sendNotificationEmail = async () => {
    try {
      await axios.post(`${API_URL}/emails/send-notification-email`, { email });
      Alert.alert('Éxito', 'El correo de notificación se ha enviado correctamente.');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al enviar el correo.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 80 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Notifications</Text>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          containerStyle={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}
          icon={<Image source={require('../../../assets/icons/icons8-opciones-para-ordenar-100.png')}
            style={{ width: 30, height: 30 }} />}
          title='Ordenar'
          color='transparent'
          titleStyle={{ fontSize: 18, fontWeight: 'bold', color: '#48A2E2', marginLeft: 10 }}
        />
        <Button
          containerStyle={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}
          icon={<Image source={require('../../../assets/icons/icons8-ajustes-100.png')}
            style={{ width: 30, height: 30 }} />}
          title='Ajustes'
          color='transparent'
          onPress={() => navigation.navigate('notifysettings')}
          titleStyle={{ fontSize: 18, fontWeight: 'bold', color: '#48A2E2', marginLeft: 10 }}
        />
      </View>
      <View style={{ width: '100%', marginVertical: 20 }}>
        <TextInput
          placeholder="Enter child ID"
          value={childId}
          onChangeText={setChildId}
          style={{
            width: '100%',
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            marginBottom: 10,
          }}
        />
        <Button
          title="Fetch Vaccination Data"
          onPress={fetchVaccinationData}
        />
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          style={{
            width: '100%',
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            marginBottom: 10,
            marginTop: 10, // Agregar margen superior para separar los campos
          }}
        />
        <Button
          title="Send Notification Email"
          onPress={sendNotificationEmail}
        />
      </View>
      <View style={{ width: '100%' }}>
        {childDataFetched && notifications.length === 0 && (
          <Text>No notifications available for this child ID.</Text>
        )}
        {notifications.map((notification, index) => (
          <View key={index} style={{
            flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10,
            backgroundColor: '#FFFFFF',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
            borderRadius: 10,
            paddingVertical: 10,
            overflow: 'hidden'
          }}>
            <View style={{ width: 120, alignItems: 'center' }}>
              <Image source={require('../../../assets/HepatitisB.jpg')} style={{ width: 100, height: 100 }} />
            </View>
            <View style={{ flex: 1, width: '100%' }}>
              <View style={{ flexDirection: 'row', width: '100%', paddingRight: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Para: </Text>
                <Text numberOfLines={1} style={{ fontSize: 18, color: '#48A2E2' }}>{notification.parentName}</Text>
              </View>
              <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Vacuna: </Text>
                    <Text style={{ fontSize: 18, color: '#48A2E2' }}>{notification.vaccineName}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Fecha esperada: </Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#48A2E2' }}>{notification.expectedVaccineDate}</Text>
                  </View>
                </View>
                <View style={{ width: 50, height: 50 }}>
                  <Image source={require('../../../assets/icons/icons8-campana-96(1).png')} style={{ width: 50, height: 50 }} />
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Tiempo restante: </Text>
                <Text style={{ fontSize: 18, color: '#48A2E2' }}>{notification.remainingTime}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Notifications;
