import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { CheckBox, Button, Icon } from '@rneui/themed'
import { API_URL } from '../../utils/constants'

// Datos de desarrollo alineados con la Cartilla Nacional de Salud (0 a 9 años)
const developmentData = [
  { age: '1 mes',       questions: ['¿Puede voltear su cabeza para los dos lados cuando está boca abajo?',
                                    '¿Llora o hace ruido al estar incómoda(o) o querer comer?',
                                    '¿Se tranquiliza al hablarle o levantarla(o)?'] },
  { age: '3 meses',     questions: ['¿Logra sostener la cabeza?',
                                    '¿Hace sonidos con la boca o sonríe?',
                                    '¿Responde cuando juegan juntos?'] },
  { age: '6 meses',     questions: ['¿Se mantiene sentada(o), aunque sea apoyándose en sus manos?',
                                    '¿Imita sonidos como “le, be, pa, gu”?',
                                    '¿Se ríe cuando juegas a taparte y destaparte la cara?'] },
  { age: '12 meses',    questions: ['¿Puede caminar agarrado de muebles?',
                                    '¿Cuándo está entretenida(o) y se le dice “NO” reacciona?',
                                    '¿Empieza a comer por sí sola(o)?'] },
  { age: '18 meses',    questions: ['¿Camina sola(o)?',
                                    '¿Dice cuatro palabras, además de mamá o papá?',
                                    '¿Imita tareas sencillas de casa, como: barrer o limpiar?'] },
  { age: '2 años',      questions: ['¿Puede subirse sola(o) a las sillas, sillones, camas?',
                                    '¿Obedece órdenes sencillas, como “dame la pelota”?',
                                    '¿Hace intentos por ser independiente? (lavarse las manos, vestirse)'] },
  { age: '3 años',      questions: ['¿Sube escaleras alternando los pies?',
                                    '¿Mantiene una conversación corta?',
                                    '¿Comparte sus juguetes?',
                                    '¿Identifica colores básicos?'] },
  { age: '4 años',      questions: ['¿Salta en un pie?',
                                    '¿Cuenta historias sencillas?',
                                    '¿Juega de forma cooperativa?',
                                    '¿Reconoce algunas letras?'] },
  { age: '5 años',      questions: ['¿Maneja triciclo o bicicleta con ruedas de apoyo?',
                                    '¿Habla claramente la mayor parte del tiempo?',
                                    '¿Sigue reglas simples en juegos?',
                                    '¿Cuenta hasta el número 10?'] },
  { age: '6 años',      questions: ['¿Se viste sin ayuda?',
                                    '¿Lee palabras sencillas?',
                                    '¿Trabaja en equipo con otros niños?',
                                    '¿Suma y resta números pequeños?'] },
  { age: '7 años',      questions: ['¿Escribe con letra clara?',
                                     '¿Explica sus ideas con claridad?',
                                    '¿Participa en actividades deportivas o artísticas?',
                                    '¿Comprende reglas básicas de juego?'] },
  { age: '8 años',      questions: ['¿Coordina movimientos complejos al jugar?',
                                    '¿Escribe oraciones sencillas de 3 o 4 palabras?',
                                    '¿Muestra empatía hacia los demás?',
                                    '¿Resuelve problemas matemáticos simples?'] },
]

// Áreas disponibles, incluyendo Información General
const areas = ['General', 'Motor', 'Lenguaje', 'Social', 'Conocimiento']

// Colores según Cartilla Nacional de Salud
const areaColors = {
  General:      '#9E9E9E', // gris
  Motor:        '#a9dfbf', // verde
  Lenguaje:     '#f8bbd0', // rosa
  Social:       '#f4d03f', // amarillo
  Conocimiento: '#af7ac5', // morado
}

const ChildDevelopment = ({ navigation, route }) => {
  const { children } = route.params
  const [answers, setAnswers] = useState({})
  const [filter, setFilter] = useState(areas[0]) // inicio: General

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

  const getAreaForQuestion = (bIndex, qIndex) => {
    return areas[(qIndex % (areas.length - 1)) + 1]
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`${API_URL}/development/${children._id}`)
        const result = await res.json()
        if (res.ok && result) setAnswers(recordsToAnswers(result.records || []))
      } catch (e) {
        console.log(e)
      }
    }
    loadData()
  }, [children._id])

  const toggleAnswer = (key) => {
    const next = { ...answers, [key]: !answers[key] }
    setAnswers(next)
    fetch(`${API_URL}/development/${children._id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ records: answersToRecords(next) }),
    }).catch((e) => console.log(e))
  }

  // Filtrado
  const filteredData = filter === 'General'
    ? developmentData.map((block, bIndex) => ({ age: block.age, questions: block.questions.map((q, qIndex) => ({ question: q, key: `${bIndex}-${qIndex}` })) }))
    : developmentData
        .map((block, bIndex) => ({ age: block.age, questions: block.questions.map((q, qIndex) => ({ question: q, area: getAreaForQuestion(bIndex, qIndex), key: `${bIndex}-${qIndex}` })).filter((item) => item.area === filter) }))
        .filter((block) => block.questions.length)

  return (
    <View style={{ flex: 1 }}>
      {/* Filtro de áreas con colores */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 10 }}>
        {areas.map((area) => (
          <Button
            key={area}
            title={area}
            type={filter === area ? 'solid' : 'outline'}
            color={areaColors[area]}
            onPress={() => setFilter(area)}
            containerStyle={{ marginRight: 8 }}
          />
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 80 }}>
        {filteredData.map((block, idx) => (
          <View key={idx} style={{ width: '95%', backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4, borderRadius: 10, padding: 10, marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{block.age}</Text>
            {block.questions.map(({ question, key }) => (
              <CheckBox key={key} title={question} checked={!!answers[key]} onPress={() => toggleAnswer(key)} containerStyle={{ backgroundColor: 'transparent' }} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default ChildDevelopment
