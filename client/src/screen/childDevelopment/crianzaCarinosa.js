import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const consejos = [
  {
    titulo: 'Nutricion Adecuada',
    descripcion: '“La lactancia materna y una buena alimentacion saludable de acuerdo a la edad, son muy importantes para el adecuado crecimiento y desarrollo del cuerpo y cerebro de tu hija o hijo.”',
    imagen: require('../../../assets/nutricion.png')
  },
  {
    titulo: 'Buena Salud',
    descripcion: '“Cuida su salud y procura su higiene. Lleva a tu hija o hijo a sus consultas de control, atiende sus necesidades y enfermedades. Asignale actividades de acuerdo a su edad, como vestirse y barrer.”',
    imagen: require('../../../assets/buena-salud.png')
  },
  {
    titulo: 'Atencion receptiva',
    descripcion: '“Aprende a escuchar a tu hija o hijo. Reconoce y respeta sus emociones y sentimientos. Mantén la calma en momentos dificiles, como cuando hace un berrinche, esta muy enojado o muy triste.”',
    imagen: require('../../../assets/atencion.png')
  },
  {
    titulo: 'Proteccion y seguridad',
    descripcion: '“Haz de su entorno un sitio seguro y libre de violencia, demuéstrale tu cariño y que cuenta contigo. No recurras al castigo fisico. Enseñale a respetar su cuerpo y que nadie puede tocarla(o) sin su permiso.”',
    imagen: require('../../../assets/proteccion.png')
  },
  {
    titulo: 'Oportunidad para el aprendizaje temprano',
    descripcion: '“Dedica unos momentos del dia para jugar y leer con tu hija o hijo, esto favorece el desarrollo cerebral y crea vínculos afectivos.”',
    imagen: require('../../../assets/aprendizaje.png')
  }
];

const CrianzaCarinosa = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crianza Cariñosa </Text>

      {consejos.map((consejo, index) => (
        <View key={index} style={styles.tipContainer}>
          <Image source={consejo.imagen} style={styles.tipImage} />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>{consejo.titulo}</Text>
            <Text style={styles.tipText}>{consejo.descripcion}</Text>
          </View>
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
    marginBottom: 15,
  },
  tipContainer: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  tipImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: 'contain'
  },
  tipContent: {
    flex: 1
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
