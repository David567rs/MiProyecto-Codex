import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { CheckBox, Button, Icon } from '@rneui/themed'
import { API_URL } from '../../utils/constants'

const developmentData = [
  {
    age: '1 mes',
    questions: [
      '¿Puede voltear su cabeza para los dos lados cuando está boca abajo?',
      '¿Llora o hace ruido al estar incómoda(o) o querer comer?',
      '¿Se tranquiliza al hablarle o levantarla(o)?',
    ],
  },
  {
    age: '3 meses',
    questions: [
      '¿Logra sostener la cabeza?',
      '¿Hace sonidos con la boca o sonríe?',
      '¿Responde cuando juegan juntos?',
    ],
  },
  {
    age: '6 meses',
    questions: [
      '¿Se mantiene sentada(o), aunque sea apoyándose en sus manos?',
      '¿Imita sonidos como “le, be, pa, gu”?',
      '¿Se ríe cuando juegas a taparte y destaparte la cara?',
    ],
  },
  {
    age: '12 meses',
    questions: [
      '¿Puede caminar agarrado de muebles?',
      '¿Cuándo está entretenida(o) y se le dice “NO” reacciona?',
      '¿Empieza a comer por sí sola(o)?',
    ],
  },
  {
    age: '18 meses',
    questions: [
      '¿Camina sola(o)?',
      '¿Dice cuatro palabras, además de mamá o papá?',
      '¿Imita tareas sencillas de casa, como: barrer o limpiar?',
    ],
  },
  {
    age: '2 años',
    questions: [
      '¿Puede subirse sola(o) a las sillas, sillones, camas?',
      '¿Obedece órdenes sencillas, como “dame la pelota”?',
      '¿Hace intentos por ser independiente? (lavarse las manos, vestirse)',
    ],
  },
  {
    age: '3 años',
    questions: [
      '¿Juega con otras niñas o niños?',
      '¿Conoce los nombres de al menos cuatro colores?',
      '¿Puede dibujar un círculo o una cruz?',
      '¿Frecuentemente pregunta “por qué”?',
    ],
  },
  {
    age: '4 años',
    questions: [
      '¿Puede ir sola(o) al baño?',
      '¿Puede contar hasta el número 10?',
      '¿Puede dibujar una persona con una o más partes del cuerpo?',
      '¿Pide “más” cuando algo le gusta mucho?',
    ],
  },
  {
    age: '5 años',
    questions: [
      '¿Le gusta ir a la escuela?',
      '¿Puede escribir dos números o letras?',
      '¿Puede brincar hacia atrás con los pies juntos?',
      '¿Comunica sus emociones cuando está “feliz, triste o enojado”?',
    ],
  },
  {
    age: '6 años',
    questions: [
      '¿Puede seguir las reglas de juegos sencillos?',
      '¿Lee por lo menos 10 palabras en voz alta?',
    ],
  },
  {
    age: '7 años',
    questions: [
      '¿Se integra en juegos que requieren mantener puntaje?',
      '¿Enlista palabras en orden alfabético?',
    ],
  },
  {
    age: '8 años',
    questions: [
      '¿Se disculpa después de lastimar los sentimientos de otras personas?',
      '¿Escribe oraciones sencillas de 3 o 4 palabras?',
    ],
  },
];

const ChildDevelopment = ({ navigation, route }) => {
  const { children } = route.params
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          color='transparent'
          icon={<Icon type='ionicons' name='arrow-back' size={30} color='#FFFFFF' />}
          onPress={() => navigation.navigate('profilechildren', { children })}
        />
      ),
    })
  }, [navigation, children])

  const recordsToAnswers = (records) => {
    const obj = {}
    records.forEach((block, bIndex) => {
      block.milestones.forEach((m, qIndex) => {
        obj[`${bIndex}-${qIndex}`] = m.value
      })
    })
    return obj
  }

  const answersToRecords = (state) =>
    developmentData.map((block, bIndex) => ({
      ageBlock: block.age,
      milestones: block.questions.map((q, qIndex) => ({
        area: getAreaForQuestion(bIndex, qIndex),
        question: q,
        value: !!state[`${bIndex}-${qIndex}`],
      })),
    }))

  const getAreaForQuestion = (blockIndex, questionIndex) => {
    // Simple logic to assign areas based on question index
    const areas = ['Motor', 'Lenguaje', 'Social', 'Conocimiento']
    return areas[questionIndex % areas.length]
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`${API_URL}/development/${children._id}`)
        const result = await res.json()
        if (res.ok && result) {
          setAnswers(recordsToAnswers(result.records || []))
        }
      } catch (e) {
        console.log(e)
      }
    }
    loadData()
  }, [children._id])

  const toggleAnswer = (key) => {
    const newState = { ...answers, [key]: !answers[key] }
    setAnswers(newState)
    const records = answersToRecords(newState)
    fetch(`${API_URL}/development/${children._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ records }),
    }).catch((e) => console.log(e))
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 80 }}>
      {developmentData.map((block, index) => (
        <View
          key={index}
          style={{
            width: '95%',
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
            borderRadius: 10,
            padding: 10,
            marginTop: 10
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{block.age}</Text>
          {block.questions.map((question, qIndex) => {
            const key = `${index}-${qIndex}`
            return (
              <CheckBox
                key={key}
                title={question}
                checked={!!answers[key]}
                onPress={() => toggleAnswer(key)}
                containerStyle={{ backgroundColor: 'transparent' }}
              />
            )
          })}
        </View>
      ))}
    </ScrollView>
  )
}

export default ChildDevelopment