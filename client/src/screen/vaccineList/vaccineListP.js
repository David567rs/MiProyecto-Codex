import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Image } from '@rneui/themed'
import useMonth from '../../hooks/useMonth'
import { NoImgVaccineIcon } from '../../icons/iconsSvg'

const VaccineListP = ({ route, navigation }) => {
        const month = route.params.month
        if (month === undefined) return null
        const { getVaccinesForMonth, loading, vaccines } = useMonth()

        useEffect(() => {
                getVaccinesForMonth(month._id)
        }, [route])

        if (loading) {
                return (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size='large' color='#48A2E2' />
                        </View>
                )
        }

        return (
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 100 }}>
                        <View style={{
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
                        }}>
                                <Image source={require('../../../assets/icons/icons8-calendario-100.png')} style={{ width: 30, height: 30 }} />
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Mes {month?.month }</Text>
                                <Image source={require('../../../assets/icons/icons8-calendario-100.png')} style={{ width: 30, height: 30 }} />
                        </View>
                        <View style={{ flex: 1, width: '100%', paddingVertical: 20, gap: 20 }}>
                                {vaccines.map((v, i) => (
                                        <TouchableOpacity activeOpacity={0.8} key={v._id}
                                                onPress={() => navigation.navigate('vaccinedetail', { vaccine: v , month})}
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
                                                }}>
                                                {v?.images?.length > 0 ? (
                                                        <Image source={{ uri: v?.images[0] }} style={{ width: 100, height: 100 }} />
                                                ) : (
                                                        <NoImgVaccineIcon size={50} />
                                                )}
                                                <View style={{ flex: 1 }}>
                                                        <View style={{ flexDirection: 'row', height: 30, justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{v?.name}</Text>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                                                                        <Text>Aplicada</Text>
                                                                        <Image source={require('../../../assets/icons/icons8-de-acuerdo-96.png')} style={{ width: 30, height: 30 }} />
                                                                </View>
                                                        </View>
                                                        <View style={{ flex: 1 }}>
                                                                <Text style={{ fontSize: 14 }} numberOfLines={5}>{v?.description}</Text>
                                                        </View>
                                                </View>
                                        </TouchableOpacity>
                                ))}
                        </View>
                </ScrollView>
        )
}

export default React.memo(VaccineListP)