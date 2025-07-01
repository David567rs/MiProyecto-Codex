import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { API_URL } from '../utils/constants'

const useMonth = () => {

        const [loading, setLoading] = useState(false)
        const [month, setMonth] = useState([])

        const [vaccines, setVaccines] = useState([])

        const getAllMonths = async () => {

                try {
                        setLoading(true)
                        const response = await fetch(`${API_URL}/vaccine-month`, {
                                method: 'GET',
                                headers: {
                                        'Content-Type': 'application/json'
                                }
                        })

                        const results = await response.json()
                        if (results.error || results.statusCode === 400 || results.statusCode === 500) {
                                Alert.alert(results?.error.toString() || 'Error al obtener los articulos, intente de nuevo')
                                return
                        }

                        const firstRow = results.map(item => item.vaccines)

                        const plainArray = [...new Set(firstRow.flat())]
                      
                        setMonth(results)
                } catch (e) {
                        console.log(e)
                } finally {
                        setLoading(false)
                }
        }

        const getVaccinesForMonth = async (id) => {

                if (id === undefined) return
                try {
                        setLoading(true)
                        const response = await fetch(`${API_URL}/vaccine-month/vaccines/${id}`, {
                                method: 'GET',
                                headers: {
                                        'Content-Type': 'application/json'
                                }
                        })

                        const results = await response.json()
      
                        if (results.error || results.statusCode === 400 || results.statusCode === 500) {
                                setErrors(results)
                                return
                        }

                        setVaccines(results)
                } catch (e) {
                        console.log(e)
                } finally {
                        setLoading(false)
                }
        }


        const deleteMonth = async (id) => {

                Alert.alert('Eliminar', '¿Estas seguro de eliminar la campaña?', [
                        {
                                text: 'Cancelar',
                                style: 'cancel'
                        },
                        {
                                text: 'Eliminar',
                                onPress: async () => {
                                        try {
                                                setLoading(true)
                                                const response = await fetch(`${API_URL}/vaccine-month/${id}`, {
                                                        method: 'DELETE',
                                                        headers: {
                                                                'Content-Type': 'application/json'
                                                        }
                                                })

                                                const results = await response.json()
                                                if (results.error || results.statusCode === 400 || results.statusCode === 500) {
                                                        Alert.alert(results?.error.toString() || 'Error al obtener los articulos, intente de nuevo')
                                                        return
                                                }

                                                getAllMonths()
                                        } catch (e) {
                                                console.log(e)
                                        } finally {
                                                setLoading(false)
                                        }
                                }
                        }
                ])
        }

        return {
                getAllMonths,
                month,
                deleteMonth,
                loading,
                getVaccinesForMonth,
                vaccines

        }
}

export default useMonth