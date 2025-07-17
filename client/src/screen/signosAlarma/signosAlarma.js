import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  CheckBox,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { API_URL } from '../../utils/constants';
import { Button, Icon } from '@rneui/themed';

const sintomas = [
  'No ha alcanzado logros previos según su edad',
  'Se atora al comer o le cuesta aceptar alimentos',
  'No muestra expresiones faciales o contacto visual',
  'No responde a sonidos fuertes o cuando se le habla por su nombre',
];

const SignosAlarma = ({ navigation, route }) => {
  const { children } = route.params;
  const [seleccionados, setSeleccionados] = useState({});
  const [comentarios, setComentarios] = useState('');
  const [diagnostico, setDiagnostico] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`${API_URL}/alarm-signs/${children._id}`);
        const data = await res.json();
        if (res.ok && data) {
          const selected = {};
          (data.signs || []).forEach((s) => {
            selected[s] = true;
          });
          setSeleccionados(selected);
          setComentarios(data.comments || '');
          setDiagnostico(data.diagnosis || '');
        }
      } catch (e) {
        console.log(e);
      }
    };
    loadData();
  }, [children._id]);

  const updateDB = async (newState, newComments = comentarios, newDiag = diagnostico) => {
    try {
      await fetch(`${API_URL}/alarm-signs/${children._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signs: Object.keys(newState).filter((k) => newState[k]),
          comments: newComments,
          diagnosis: newDiag,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const alternarSintoma = (item) => {
    const newState = { ...seleccionados, [item]: !seleccionados[item] };
    setSeleccionados(newState);
    updateDB(newState);
  };

  const changeDiagnostico = (value) => {
    setDiagnostico(value);
    updateDB(seleccionados, comentarios, value);
  };

  const changeComentarios = (value) => {
    setComentarios(value);
  };

  const onBlurComentarios = () => {
    updateDB(seleccionados, comentarios, diagnostico);
  };

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Signos de Alarma</Text>

      {sintomas.map((item, index) => (
        <View key={index} style={styles.checkboxContainer}>
          <CheckBox
            value={!!seleccionados[item]}
            onValueChange={() => alternarSintoma(item)}
          />
          <Text style={styles.label}>{item}</Text>
        </View>
      ))}

      <Text style={styles.subtitle}>¿Signos de alarma que presenta el niño?</Text>
      <TextInput
        style={styles.textarea}
        multiline
        numberOfLines={3}
        placeholder="Describa observaciones específicas..."
        value={comentarios}
        onChangeText={changeComentarios}
        onBlur={onBlurComentarios}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.diagnosisButton, diagnostico === 'Normal' && styles.selected]}
          onPress={() => changeDiagnostico('Normal')}
        >
          <Text style={styles.buttonText}>Normal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.diagnosisButton, diagnostico === 'Anormal' && styles.selected]}
          onPress={() => changeDiagnostico('Anormal')}
        >
          <Text style={styles.buttonText}>Anormal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    minHeight: 80,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  diagnosisButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  selected: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SignosAlarma;