import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { CheckBox, Button, Icon } from '@rneui/themed'
import { API_URL } from '../../utils/constants'

const developmentData = [
  {
    age: '1 mes',
    questions: [
      '¿Puede voltear su cabeza hacia los dos?',
      '¿Hace sonidos con la boca?',
      '¿Se ríe cuando juegas?'
    ]
  },
  {
    age: '3 meses',
    questions: [
      '¿Levanta la cabeza cuando está boca abajo?',
      '¿Sigue con la mirada objetos en movimiento?',
      '¿Responde a sonidos fuertes?'
    ]
  }
]

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
        question: q,
        value: !!state[`${bIndex}-${qIndex}`],
      })),
    }))

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