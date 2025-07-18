import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { CheckBox, Button, Icon } from '@rneui/themed';
import { API_URL } from '../../utils/constants';

const QUESTIONS = [
  '¿Las heces del bebé (popó) son blancas o muy claras?',
  '¿El color de la piel o de los ojos es amarillo (ictericia) después del primer mes?',
  '¿El bebé orina poco o casi nada?',
  '¿Tiene el abdomen muy inflamado?',
];

const EarlyDetection = ({ navigation, route }) => {
  const { children } = route.params;
  const [responses, setResponses] = useState({});
  const [observations, setObservations] = useState('');
  const [suspect, setSuspect] = useState(false);

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
        const res = await fetch(`${API_URL}/detection/${children._id}`);
        const data = await res.json();
        if (res.ok && data) {
          const obj = {};
          (data.responses || []).forEach((r, i) => {
            obj[i] = r.value;
          });
          setResponses(obj);
          setObservations(data.observations || '');
          setSuspect(data.suspect || false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    load();
  }, [children._id]);

  const save = async (payload) => {
    try {
      await fetch(`${API_URL}/detection/${children._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const buildPayload = (resp, obs, susp) => ({
    responses: QUESTIONS.map((q, idx) => ({ question: q, value: !!resp[idx] })),
    observations: obs,
    suspect: susp,
  });

  const toggleResponse = (index) => {
    const updated = { ...responses, [index]: !responses[index] };
    setResponses(updated);
    save(buildPayload(updated, observations, suspect));
  };

  const updateObservations = (text) => {
    setObservations(text);
    save(buildPayload(responses, text, suspect));
  };

  const markSuspect = () => {
    setSuspect(true);
    save(buildPayload(responses, observations, true));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detección Temprana de Enfermedades</Text>
      {QUESTIONS.map((q, i) => (
        <View key={i} style={styles.questionContainer}>
          <CheckBox
            checked={!!responses[i]}
            onPress={() => toggleResponse(i)}
            containerStyle={styles.checkbox}
          />
          <Text style={styles.question}>{q}</Text>
        </View>
      ))}
      <Text style={styles.subtitle}>Observaciones del caso sospechoso:</Text>
      <TextInput
        style={styles.textarea}
        multiline
        placeholder="Escriba sus observaciones..."
        value={observations}
        onChangeText={updateObservations}
      />
      <TouchableOpacity style={[styles.button, suspect && styles.suspect]} onPress={markSuspect}>
        <Text style={styles.buttonText}>Marcar como caso sospechoso</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    alignItems: 'center',
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  question: {
    marginLeft: 5,
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
  },
  checkbox: {
    padding: 0,
    margin: 0,
  },
  subtitle: {
    marginTop: 20,
    fontWeight: '600',
    fontSize: 18,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    minHeight: 100,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  suspect: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EarlyDetection;