import { View, Text, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { Image } from '@rneui/themed'
import { ListItem } from '@rneui/base'
const { width } = Dimensions.get('screen')

const HospitalDetail = ({ route, navigation }) => {

        const { hospital } = route.params

        const days = [{ code: 'L', day: 'Lunes' }, { code: 'M', day: 'Martes' }, { code: 'X', day: 'Miércoles' }, { code: 'J', day: 'Jueves' }, { code: 'V', day: 'Viernes' }, { code: 'S', day: 'Sábado' }, { code: 'D', day: 'Domingo' }]

        const openingHours = () => {
                const firstHour = hospital.hour[0]
                const lastHour = hospital.hour[hospital.hour.length - 1]
                const firstDay = days.find(day => day.code == hospital.days[0]).day || ''
                const lastDay = days.find(day => day.code == hospital.days[hospital.days.length - 1]).day || ''
                return `${firstDay} a ${lastDay} de ${firstHour?.toUpperCase() || ''} a ${lastHour?.toUpperCase() || ''} HRS`
        }

        return (
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingBottom: 80 }}>
                        <View style={{ width: '100%', aspectRatio: 1 / 1 }}>
                                {hospital?.images?.length > 0 ? (
                                        <Image
                                                resizeMode='contain'
                                                source={{ uri: hospital.images[0] }}
                                                style={{ aspectRatio: 1 / 1 }} />
                                ) : (
                                        <Image
                                                resizeMode='contain'
                                                source={{ uri:null }} style={{ aspectRatio: 1 / 1 }} />
                                )}
                        </View>
                        <View style={{
                                width: '95%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 10,
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
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                                <Text>{hospital.name}</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Horarios</Text>
                                                <Text numberOfLines={2} style={{ textAlign: 'center' }}>{openingHours()}</Text>
                                        </View>
                                </View>
                                <View style={{ width: '100%' }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'left', paddingVertical: 10 }}>Descripción</Text>
                                        <Text>{hospital?.description}</Text>
                                </View>
                                <View style={{ width: '100%' }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingVertical: 10 }}>Ubicación</Text>
                                </View>
                                <View style={{ width: '100%', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingVertical: 10 }}>Direccion</Text>
                                        <ListItem bottomDivider >
                                                <Image source={require('../../../assets/icons/icons8-código-postal-100.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title>CP</ListItem.Title>
                                                        <ListItem.Subtitle style={{ color: '#48A2E2' }}>{hospital?.address?.zipCode}</ListItem.Subtitle>
                                                </ListItem.Content>
                                                <Image source={require('../../../assets/icons/icons8-ayuntamiento-de-los-angeles-100.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title>Estado</ListItem.Title>
                                                        <ListItem.Subtitle style={{ color: '#48A2E2' }}>{hospital?.address?.state}</ListItem.Subtitle>
                                                </ListItem.Content>
                                        </ListItem>
                                        <ListItem bottomDivider>
                                                <Image source={require('../../../assets/icons/icons8-ciudad-100.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title>Ciudad</ListItem.Title>
                                                        <ListItem.Subtitle style={{ color: '#48A2E2' }}>{hospital?.address?.city}</ListItem.Subtitle>
                                                </ListItem.Content>
                                                <Image source={require('../../../assets/icons/icons8-compra-entregada-100.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title>Colonia</ListItem.Title>
                                                        <ListItem.Subtitle style={{ color: '#48A2E2' }}>{hospital?.address?.neighborhood}</ListItem.Subtitle>
                                                </ListItem.Content>
                                        </ListItem>
                                        <ListItem>
                                                <Image source={require('../../../assets/icons/icons8-ciudad-100.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title>Calle</ListItem.Title>
                                                        <ListItem.Subtitle style={{ color: '#48A2E2' }}>{hospital?.address?.street}</ListItem.Subtitle>
                                                </ListItem.Content>
                                                <Image source={require('../../../assets/icons/icons8-hashtag-grande-96.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title>Numero</ListItem.Title>
                                                        <ListItem.Subtitle style={{ color: '#48A2E2' }}>{hospital?.address?.number}</ListItem.Subtitle>
                                                </ListItem.Content>
                                        </ListItem>
                                </View>
                        </View>
                </ScrollView>
        )
}

export default HospitalDetail