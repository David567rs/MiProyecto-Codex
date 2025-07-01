import { View, Text, ScrollView, FlatList, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Button, ButtonGroup, TabView, Image } from '@rneui/base'
import ItemVaccine from './itemVaccine'
import useMonth from '../../hooks/useMonth'

const TabVaccines = ({ route, navigation }) => {

        const nameFilter = ['0-6', '7-24', '36-72', 'Completo']

        const { month, getAllMonths, loading, deleteMonth } = useMonth()

        useEffect(() => {
                const unsubscribe = navigation.addListener('focus', () => {
                        getAllMonths()
                });
                return unsubscribe;
        }, [navigation])

        return (
                <TabView.Item style={{ width: '100%', marginBottom: 80 }}>
                        <ScrollView keyboardDismissMode='interactive'>
                                <View style={{ width: '100%', padding: 10 }}>
                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                                <Button
                                                        title='Agregar Mes'
                                                        onPress={() => navigation.navigate('addmonth')}
                                                        containerStyle={{ borderRadius: 30 }}
                                                />
                                                <Button
                                                        title='Ver Vacunas'
                                                        onPress={() => navigation.navigate('vaccinesmedic')}
                                                        containerStyle={{ borderRadius: 30 }}
                                                />
                                        </View>
                                        <View style={{ width: '100%' }}>
                                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Button
                                                                icon={<Image source={require('../../../assets/icons/icons8-filtro-relleno-100.png')} style={{ width: 20, height: 20 }} />}
                                                                title='Filtros'
                                                                color='transparent'
                                                                containerStyle={{ borderRadius: 30 }}
                                                                titleStyle={{ color: '#48A2E2', fontWeight: 'bold' }}
                                                        />
                                                        <Button
                                                                title='Esquema'
                                                                icon={<Image source={require('../../../assets/icons/icons8-calendario-100.png')} style={{ width: 20, height: 20 }} />}
                                                                color='transparent'
                                                                onPress={() => navigation.navigate('vaccinationcalendar')}
                                                                containerStyle={{ borderRadius: 30 }}
                                                                titleStyle={{ color: '#48A2E2', fontWeight: 'bold' }}
                                                        />
                                                </View>
                                        </View>
                                        <View>
                                                <ButtonGroup
                                                        buttons={nameFilter}
                                                        innerBorderStyle={{ width: 0 }}
                                                        selectedButtonStyle={{ backgroundColor: '#48A2E2' }}
                                                        style={{ width: '100%', borderRadius: 30, backgroundColor: '#CCC', marginTop: 10 }}
                                                        buttonStyle={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: '#48A2E2', borderRadius: 10 }}
                                                        textStyle={{ color: '#48A2E2' }}
                                                        containerStyle={{ marginBottom: 20, gap: 10, backgroundColor: 'transparent', borderWidth: 0 }}
                                                        selectedIndex={0}
                                                        onPress={(value) => console.log(value)}
                                                />
                                        </View>
                                        <View style={{ flex: 1, width: '100%', gap: 20 }}>
                                                <View style={{ flex: 1, gap: 20 }}>
                                                        <FlatList
                                                                scrollEnabled={false}
                                                                horizontal={false}
                                                                data={month}
                                                                numColumns={2}
                                                                renderItem={({ item }) => <ItemVaccine m={item} deleteMonth={deleteMonth}  />}
                                                                keyExtractor={item => item._id.toString()}
                                                                ItemSeparatorComponent={() => <View style={{ width: 20, height: 20 }} />}
                                                        />
                                                </View>
                                        </View>
                                </View>
                        </ScrollView>
                </TabView.Item>
        )
}

export default TabVaccines