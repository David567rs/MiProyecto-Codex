import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  
} from 'react-native';
import { API_URL } from '../../utils/constants';
import { Button, Icon, CheckBox } from '@rneui/themed';

const EMPTY_ROW = { age: '', weight: '', height: '', notes: '', medicalCheck: false };

const ChildAgeControl = ({ navigation, route }) => {
  const { children } = route.params;
  const [rows, setRows] = useState([EMPTY_ROW]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          color="transparent"
          icon={<Icon type="ionicons" name="arrow-back" size={30} color="#FFFFFF" />}
          onPress={() => navigation.navigate('profilechildren', { children })}
        />
      ),
    });
  }, [navigation, children]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/age-control/${children._id}`);
        const data = await res.json();
        if (res.ok && data) {
          setName(data.name || '');
          setDate(data.date || '');
          setHour(data.hour || '');
          setRows(data.controls && data.controls.length > 0 ? data.controls : [EMPTY_ROW]);
        }
      } catch (e) {
        console.log(e);
      }
    };
    load();
  }, [children._id]);

  const save = async (payload) => {
    try {
      await fetch(`${API_URL}/age-control/${children._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const addRow = () => {
    const updated = [...rows, { ...EMPTY_ROW }];
    setRows(updated);
    save({ name, date, hour, controls: updated });
  };

  const updateRow = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
    save({ name, date, hour, controls: updated });
  };

  const updateField = (setter) => (value) => {
    setter(value);
    save({ name: setter === setName ? value : name, date: setter === setDate ? value : date, hour: setter === setHour ? value : hour, controls: rows });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Controles Infantiles por Edad</Text>
      <Text>Nombre completo: </Text>
      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={updateField(setName)} />
      <Text>Fecha: </Text>
      <TextInput style={styles.input} placeholder="Fecha" value={date} onChangeText={updateField(setDate)} />
        <Text>Hora: </Text>
      <TextInput style={styles.input} placeholder="Hora" value={hour} onChangeText={updateField(setHour)} />
      {rows.map((row, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.rowTitle}>Control #{i + 1}</Text>
          <Text>Edad: </Text>
          <TextInput
            style={styles.input}
            placeholder="Edad"
            value={row.age}
            onChangeText={(v) => updateRow(i, 'age', v)}
          />
          <Text>Peso: </Text>
          <TextInput
            style={styles.input}
            placeholder="Peso"
            value={row.weight}
            onChangeText={(v) => updateRow(i, 'weight', v)}
          />
          <Text>Talla: </Text>
          <TextInput
            style={styles.input}
            placeholder="Talla"
            value={row.height}
            onChangeText={(v) => updateRow(i, 'height', v)}
          />
          <Text>Nota: </Text>
          <TextInput
            style={styles.input}
            placeholder="Notas"
            value={row.notes}
            onChangeText={(v) => updateRow(i, 'notes', v)}
          />
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={row.medicalCheck}
              onValueChange={() => updateRow(i, 'medicalCheck', !row.medicalCheck)}
            />
            <Text style={styles.checkLabel}>Revisión Médica</Text>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addRow}>
        <Text style={styles.addButtonText}>Agregar Control</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  Text:{
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  rowTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkLabel: {
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChildAgeControl;