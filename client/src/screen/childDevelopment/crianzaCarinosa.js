import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const consejos = [
  {
    titulo: 'Estimulación temprana afectiva',
    descripcion: '“Juega con tu bebé, háblale, cántale y acarícialo. Esto fortalece su inteligencia y su confianza.”'
  },
  {
    titulo: 'Evitar el maltrato y promover el respeto',
    descripcion: '“No le grites ni le pegues. Los niños aprenden mejor cuando se les habla con amor y paciencia.”'
  },
  {
    titulo: 'Alimentación y lactancia',
    descripcion: '“Amamántalo exclusivamente durante sus primeros 6 meses. Es el mejor alimento para su crecimiento y defensas.”'
  },
  {
    titulo: 'Vínculo afectivo',
    descripcion: '“Abraza a tu hija(o) todos los días. El contacto amoroso fortalece su desarrollo emocional.”'
  }
];

const CrianzaCarinosa = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crianza Cariñosa y Sensible</Text>

      {consejos.map((consejo, index) => (
        <View key={index} style={styles.tipContainer}>
          <Text style={styles.tipTitle}>{consejo.titulo}</Text>
          <Text style={styles.tipText}>{consejo.descripcion}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15
  },
  tipContainer: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10
  },
  tipTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  tipText: {
    fontSize: 15
  }
});

export default CrianzaCarinosa;