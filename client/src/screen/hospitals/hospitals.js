import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Button } from '@rneui/base'
import { ButtonGroup, Icon, SearchBar } from '@rneui/themed'
import { GlobalContext } from '../../contexts/globalContext'
import useHospitals from '../../hooks/useHospitals'
import CardHospital from './cardHospital'
import { FlatList } from 'react-native-gesture-handler'

const Hospitals = ({ route, navigation }) => {

        const { session } = useContext(GlobalContext)
        const { getHospitals, hospitals, loading, deleteHospital } = useHospitals()

        useEffect(() => {
                const unsubscribe = navigation.addListener('focus', () => {
                        getHospitals()
                });
                return unsubscribe;

        }, [navigation])

        return (
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 100 }}>
                        <Button
                                title='Agregar'
                                iconPosition='right'
                                icon={<Icon name='add' color='white' />}
                                containerStyle={{ borderRadius: 20, width: '50%' }}
                                onPress={() => navigation.navigate('addhospital')}
                        />
                        <SearchBar
                                placeholder='Buscar hospital'
                                lightTheme
                                round
                                style={{ backgroundColor: 'white' }}
                                inputStyle={{ backgroundColor: 'white' }}
                                labelStyle={{ color: 'black' }}
                                inputContainerStyle={{ backgroundColor: 'white' }}
                                containerStyle={{ width: '90%', borderRadius: 20, marginTop: 10, marginBottom: 10, backgroundColor: 'transparent' }}
                        />
                        <View style={{ width: '100%', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Filtros</Text>
                                <ButtonGroup
                                        buttons={['Todo', 'Fecha', 'Creación', 'Municipio']}
                                        innerBorderStyle={{ width: 0 }}
                                        selectedIndex={0}
                                        selectedButtonStyle={{ backgroundColor: '#48A2E2' }}
                                        style={{ width: '50%', borderRadius: 30, backgroundColor: '#CCC', marginTop: 10 }}
                                        buttonStyle={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: '#48A2E2', borderRadius: 10 }}
                                        textStyle={{ color: '#48A2E2' }}
                                        containerStyle={{ marginBottom: 20, gap: 10, backgroundColor: 'transparent', borderWidth: 0 }}
                                />
                        </View>
                        <View style={{ flex: 1, width: '100%', gap: 20 }}>
                                {loading ? (
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <ActivityIndicator size='large' color='#000' />
                                        </View>
                                ) : (
                                        hospitals.length === 0 ? (
                                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>No hay hospitales</Text>
                                        ) : (
                                                <FlatList
                                                        data={hospitals}
                                                        scrollEnabled={false}
                                                        horizontal={false}
                                                        renderItem={({ item }) => (
                                                                <CardHospital
                                                                        hospital={item}
                                                                        route={route}
                                                                        session={session}
                                                                        navigation={navigation}
                                                                        deleteHospital={deleteHospital}
                                                                />
                                                        )}
                                                        numColumns={2}
                                                        keyExtractor={item => item._id.toString()}
                                                />

                                        )
                                )}
                        </View>
                </ScrollView>
        )
}

export default Hospitals