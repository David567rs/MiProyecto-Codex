import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Button, Icon, Image } from '@rneui/themed'
import useVaccine from '../../hooks/useVaccine'
import { NoImgVaccineIcon } from '../../icons/iconsSvg'

const VaccinesMedic = ({ route, navigation }) => {

        const { getAllVaccines, getVaccines, loading } = useVaccine()

        useEffect(() => {

                const unsubscribe = navigation.addListener('focus', () => {
                        getAllVaccines()
                });

                return unsubscribe

        }, [navigation]);

        if (loading) {
                return (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size='large' color='#000' />
                        </View>
                )
        }

        return (
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 80 }}>
                        <View style={{
                                alignItems: 'center',
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                        }}>
                                <Button
                                        icon={<Image source={require('../../../assets/icons/icons8-filtro-relleno-100.png')} style={{ width: 20, height: 20 }} />}
                                        title='Ordenar'
                                        color='transparent'
                                        containerStyle={{ borderRadius: 30 }}
                                        titleStyle={{ color: '#48A2E2', fontWeight: 'bold' }}
                                />
                                <Button
                                        title='Agregar'
                                        iconPosition='right'
                                        icon={<Icon name='add' color='white' />}
                                        containerStyle={{ borderRadius: 20 }}
                                        onPress={() => navigation.navigate('addvaccine')}
                                />
                        </View>
                        <View style={{ flex: 1, width: '100%', paddingVertical: 20, gap: 20 }}>
                                {getVaccines.length === 0 ? (
                                        <Text>No hay vacunas</Text>
                                ) : (
                                        getVaccines.map((vaccine, index) => (
                                                <TouchableOpacity activeOpacity={0.8} key={vaccine._id}
                                                        onPress={() => navigation.navigate('vaccinedetail', { vaccine })}
                                                        style={{
                                                                width: '100%',
                                                                alignItems: 'center',
                                                                flexDirection: 'row',
                                                                justifyContent: 'center',
                                                                gap: 20,
                                                                shadowColor: "#000",
                                                                shadowOffset: {
                                                                        width: 0,
                                                                        height: 2,
                                                                },
                                                                shadowOpacity: 0.23,
                                                                shadowRadius: 2.62,
                                                                elevation: 4,
                                                                borderRadius: 10,
                                                                paddingVertical: 10,
                                                                backgroundColor: '#FFFFFF',
                                                                paddingHorizontal: 10,
                                                                height: 'auto'
                                                        }}>
                                                        {vaccine?.images?.length == 0 ? (
                                                                <View style={{ width: 100, height: 100, alignItems: 'center', justifyContent: 'center' }}>
                                                                        <NoImgVaccineIcon size={60} />
                                                                </View>
                                                        ) : (
                                                                <Image source={{ uri: vaccine.images[0] }} style={{ width: 100, height: 100 }} />
                                                        )}
                                                        <View style={{ flex: 1 }}>
                                                                <View style={{ flexDirection: 'row', height: 'auto', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <Text numberOfLines={2} style={{ fontSize: 18, fontWeight: 'bold' }}>{vaccine.name}</Text>
                                                                </View>
                                                                <View style={{ flex: 1 }}>
                                                                        <Text style={{ fontSize: 14 }} numberOfLines={5}>{vaccine.description}</Text>
                                                                </View>
                                                        </View>
                                                </TouchableOpacity>
                                        ))
                                )}

                        </View>
                </ScrollView>
        )
}

export default VaccinesMedic