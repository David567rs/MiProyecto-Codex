import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import useMonth from '../../hooks/useMonth'

const VaccinationCalendar = () => {

        const { month, getAllMonths } = useMonth()

        useEffect(() => {
                getAllMonths()
        }, [])

        return (
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 80 }}>
                        <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ flexGrow: 1 }}>
                                <View style={{ flex: 1 }}>
                                        <View style={{ width: 280, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 17, marginVertical: 10 }}>Esquema de vacunación</Text>
                                                <Text numberOfLines={2} style={{ textAlign: 'center' }}>Esquema nacional de Vacunación 2024 para los menores de 10 años</Text>
                                                <View>
                                                        <Text></Text>
                                                </View>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                        </View>
                                </View>
                        </ScrollView>
                </ScrollView>
        )
}

export default React.memo(VaccinationCalendar)