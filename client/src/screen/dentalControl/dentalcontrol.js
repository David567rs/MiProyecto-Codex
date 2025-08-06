import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Button, Icon, ListItem, Overlay } from '@rneui/themed';
import useDental from '../../hooks/useDental';
import DateTimePicker from '@react-native-community/datetimepicker';

const accionesPreventivas = [
  { key: 'orientacion', label: 'Orientación en salud bucal (Desde el nacimiento)' },
  { key: 'cepillado', label: 'Enseñanza técnica del cepillado (Desde primer diente)' },
  { key: 'placa', label: 'Detección de placa bacteriana (A partir de 3 años)' },
  { key: 'fluor', label: 'Aplicación de flúor (A partir de 1 año)' },
  { key: 'hilo', label: 'Enseñanza de uso de hilo dental (A partir de 6 años)' },
];

const DentalControl = ({ navigation, route }) => {
  const { children } = route.params;
  const { records, loadRecords, createRecord } = useDental();
  const [show, setShow] = useState(false);
  const [fechas, setFechas] = useState({});
  const [showPicker, setShowPicker] = useState({ key: '', visible: false });

  // Configurar header con back
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          color='transparent'
          icon={<Icon type='ionicons' name='arrow-back' size={28} color='#FFFFFF' />}
          onPress={() => navigation.navigate('profilechildren', { children })}
        />
      ),
    });
  }, [navigation, children]);

  // Cargar registros al entrar
  useEffect(() => {
    loadRecords(children._id);
  }, [children._id]);

  // Manejador de picker
  const onChange = (event, selectedDate) => {
    const { key } = showPicker;
    setShowPicker({ key: '', visible: false });
    if (selectedDate) {
      setFechas(prev => ({ ...prev, [key]: selectedDate }));
    }
  };

  // Guardar preventivas
  const savePreventivas = () => {
    Object.entries(fechas).forEach(([key, date]) => {
      createRecord({
        childId: children._id,
        date: date.toISOString(),
        visitType: accionesPreventivas.find(a => a.key === key)?.label || '',
        observation: '',
      });
    });
    setShow(false);
    setFechas({});
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 80 }}>
        <View style={{
          width: '95%',
          backgroundColor: '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
          borderRadius: 10,
          paddingVertical: 10,
          marginTop: 10,
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>Controles dentales</Text>

          {records.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#888' }}>Aún no hay registros</Text>
          ) : (
            records.map((item, idx) => {
              const fechaFormateada = new Date(item.date).toLocaleDateString();
              return (
                <ListItem
                  key={idx}
                  containerStyle={{
                    backgroundColor: '#F9F9F9',
                    borderRadius: 8,
                    marginVertical: 6,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                  }}
                >
                  <ListItem.Content>
                    <ListItem.Title style={{ fontSize: 16, fontWeight: '600' }}>
                      Fecha: {fechaFormateada}
                    </ListItem.Title>
                    <ListItem.Subtitle style={{ color: '#48A2E2', marginTop: 4 }}>
                      Medida: {item.visitType}
                    </ListItem.Subtitle>
                    {item.observation ? (
                      <ListItem.Subtitle style={{ color: '#555', marginTop: 4 }}>
                        Observación: {item.observation}
                      </ListItem.Subtitle>
                    ) : null}
                  </ListItem.Content>
                </ListItem>
              );
            })
          )}

          {/* Icono + para abrir medidas preventivas abajo de la lista */}
          <View style={{ width: '100%', alignItems: 'center', padding: 10 }}>
            <Icon
              type='ionicons'
              name='add-circle-outline'
              size={48}
              color='#48A2E2'
              onPress={() => setShow(true)}
            />
          </View>
        </View>
      </ScrollView>

      {/* Overlay con DatePicker para medidas preventivas */}
      <Overlay
        animationType='slide'
        transparent={true}
        visible={show}
        overlayStyle={{ width: '90%', padding: 20, maxHeight: '80%' }}
        onRequestClose={() => setShow(false)}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Salud Bucal - Medidas Preventivas</Text>
        {accionesPreventivas.map(item => (
          <View
            key={item.key}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, justifyContent: 'space-between' }}
          >
            <Text style={{ flex: 1 }}>{item.label}</Text>
            <TouchableOpacity
              style={{ paddingVertical: 6, paddingHorizontal: 12, borderWidth: 1, borderRadius: 4, borderColor: '#AAA' }}
              onPress={() => setShowPicker({ key: item.key, visible: true })}
            >
              <Text>{fechas[item.key] ? fechas[item.key].toLocaleDateString() : 'Seleccionar fecha'}</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Button title='Guardar Preventivas' onPress={savePreventivas} containerStyle={{ marginTop: 10 }} />
        {showPicker.visible && (
          <DateTimePicker
            value={fechas[showPicker.key] || new Date()}
            mode='date'
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChange}
          />
        )}
      </Overlay>
    </>
  );
};

export default DentalControl;