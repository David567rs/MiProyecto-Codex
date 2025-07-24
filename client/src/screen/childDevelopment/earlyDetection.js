import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { CheckBox, Button, Icon } from '@rneui/themed';
import { API_URL } from '../../utils/constants';

const QUESTIONS = [
  '¿Las heces del bebé (popó) son blancas o muy claras?',
  '¿El color de la piel o de los ojos es amarillo (ictericia) después del primer mes?',
  '¿El bebé orina poco o casi nada?',
  '¿Tiene el abdomen muy inflamado?',
];
const ORIENTATION_ROWS = 4;

// Rutas a texturas de la carta de colores (popó)
const POOP_TEXTURES = [
  require('../../../assets/popo1.png'),
  require('../../../assets/popo2.png'),
  require('../../../assets/popo3.png'),
  require('../../../assets/popo4.png'),
  require('../../../assets/popo5.png'),
  require('../../../assets/popo6.png'),
];

const EarlyDetection = ({ navigation, route }) => {
  const { children } = route.params;
  const [responses, setResponses] = useState({});
  const [observations, setObservations] = useState('');
  const [suspect, setSuspect] = useState(false);
  const [dates, setDates] = useState(Array(ORIENTATION_ROWS).fill(new Date()));
  const [pickerIdx, setPickerIdx] = useState(null);

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
          (data.responses || []).forEach((r, i) => { obj[i] = r.value; });
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

  const toggleSuspect = () => {
    const next = !suspect;
    setSuspect(next);
    save(buildPayload(responses, observations, next));
  };

  const renderOrientationRows = () => {
    return Array.from({ length: ORIENTATION_ROWS }).map((_, i) => (
      <View style={styles.tableRow} key={i}>
        {Array.from({ length: 5 }).map((_, j) => (
          <View style={styles.tableCell} key={j}><Text> </Text></View>
        ))}
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mainTitle}>Detección de Enfermedades</Text>

      <Text style={styles.sectionTitle}>Detección Temprana de Enfermedades</Text>
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

      <TextInput
        style={styles.textarea}
        multiline
        placeholder="Escriba sus observaciones..."
        value={observations}
        onChangeText={updateObservations}
      />


      <Text style={styles.sectionTitle}>Carta de Colores y Tabla de Orientación</Text>
      <Text style={styles.text}>
         Carta de colores de la popó para identiﬁcar enfermedades de las vías biliares y evitar daño irreversible en el hígado de tu bebé.
        A partir de los 7 días y hasta el mes de edad de tu bebé, compara el color de su popó con los de esta carta.
      </Text>
      <View style={styles.colorRow}>
        {POOP_TEXTURES.map((tex, i) => (
          <ImageBackground
            key={i}
            source={tex}
            style={styles.colorBox}
            imageStyle={styles.colorImage}
          >
            <Text style={styles.colorText}>{i + 1}</Text>
          </ImageBackground>
        ))}
      </View>
      <Text style={styles.text}>
        Si la popó es de color pálido como los del cuadro rojo (1, 2 y 3)
        NO ES NORMAL. Lleva a tu bebé urgentemente a la unidad
        de salud que te corresponde, ahí el personal de salud revisará
        cómo está tu bebé y le harán los estudios necesarios.
        ATENCIÓN RECEPTIVA
        ¡La salud de tu bebé depende de que se atienda a tiempo!
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          suspect ? styles.suspect : styles.normalButton
        ]}
        onPress={toggleSuspect}
      >
        <Text style={styles.buttonText}>
          {suspect
            ? 'Marcar como caso normal'
            : 'Marcar como caso anormal'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Signos de Alarma</Text>
      <Text style={styles.subTitle}>
        Si tu niña o niño presenta uno o más de estos signos de alarma, llévalo a tu unidad...
      </Text>

      <View style={styles.alarmBox}>
        <Text style={styles.alarmHeaderDark}>DEL RECIÉN NACIDO</Text>
        <View style={styles.alarmList}>
          <Text style={styles.alarmItem}>- Dificultad para respirar o respira muy rápido.</Text>
          <Text style={styles.alarmItem}>- Fiebre arriba de 38°C.</Text>
          <Text style={styles.alarmItem}>- Cordón umbilical rojo, con mal olor o secreción.</Text>
          <Text style={styles.alarmItem}>- Llanto débil o incontrolable.</Text>
          <Text style={styles.alarmItem}>- No come o succión débil.</Text>
          <Text style={styles.alarmItem}>- Fontanela hundida o abombada.</Text>
          <Text style={styles.alarmItem}>- No orina.</Text>
        </View>
      </View>

      <View style={styles.alarmBox}>
        <Text style={styles.alarmHeader}>ENFERMEDADES DIARREICAS</Text>
        <View style={styles.alarmList}>
          <Text style={styles.alarmItem}>• No come/bebe o vomita todo.</Text>
          <Text style={styles.alarmItem}>• Sed intensa.</Text>
          <Text style={styles.alarmItem}>• Fiebre {'>'} 38°C {'>'} 3 días.</Text>
          <Text style={styles.alarmItem}>• Debilidad.</Text>
          <Text style={styles.alarmItem}>• {'>'} 3 evacuaciones/h.</Text>
          <Text style={styles.alarmItem}>• Orina escasa.</Text>
          <Text style={styles.alarmItem}>• Popó con sangre.</Text>
        </View>
      </View>

      <View style={styles.alarmBox}>
        <Text style={styles.alarmHeader}>INFECCIONES RESPIRATORIAS</Text>
        <View style={styles.alarmList}>
          <Text style={styles.alarmItem}>• Respiración rápida, labios azules.</Text>
          <Text style={styles.alarmItem}>• Adormilado(a), sin energía.</Text>
          <Text style={styles.alarmItem}>• Empeora rápidamente.</Text>
          <Text style={styles.alarmItem}>• Hundimiento de costillas/silbido.</Text>
          <Text style={styles.alarmItem}>• Secreción de oído.</Text>
          <Text style={styles.alarmItem}>• Fiebre {'>'} 38°C difícil.</Text>
          <Text style={styles.alarmItem}>• No come ni bebe.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', paddingBottom: 120 },
  mainTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 15 },
  questionContainer: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 },
  question: { marginLeft: 5, fontSize: 16, flex: 1, flexWrap: 'wrap' },
  checkbox: { padding: 0, margin: 0 },
  textarea: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginTop: 10, minHeight: 80 },
  button: { padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  suspect: { backgroundColor: '#e74c3c' },
  normalButton: { backgroundColor: '#27ae60' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  text: { fontSize: 14, marginBottom: 10 },
  colorRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 10 },
  colorBox: { width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 4, overflow: 'hidden' },
  colorImage: { resizeMode: 'cover' },
  colorText: { color: '#fff', fontWeight: 'bold' },
  tableLabel: { marginTop: 10, marginBottom: 5 },
  table: {	borderWidth: 1, borderColor: '#ccc', marginBottom: 10 },
  tableRow: { flexDirection: 'row' },
  tableHeaderCell: { flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 4, backgroundColor: '#ecf0f1' },
  tableHeaderText: { textAlign: 'center', fontWeight: 'bold' },
  tableCell: { flex: 1, borderTopWidth: 1, borderRightWidth: 1, borderColor: '#ccc', height: 30 },
  subTitle: { marginBottom: 10, textAlign: 'center' },
  alarmBox: { borderWidth: 1, borderColor: '#34495e', borderRadius: 8, padding: 10, marginBottom: 20 },
  alarmHeaderDark: { backgroundColor: '#2c3e50', color: '#fff', padding: 5, borderRadius: 4, marginBottom: 5, textAlign: 'center' },
  alarmHeader: { backgroundColor: '#3498db', color: '#fff', padding: 5, borderRadius: 4, marginBottom: 5, textAlign: 'center' },
  alarmList: { marginLeft: 10 },
  alarmItem: { marginBottom: 3 },
});

export default EarlyDetection;
