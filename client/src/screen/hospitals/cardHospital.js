import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button, Icon, Image } from '@rneui/themed'
import { NoImgVaccineIcon } from '../../icons/iconsSvg'
const { width, height } = Dimensions.get('screen')
const CardHospital = ({ hospital, session, route, navigation, deleteHospital }) => {

        const viewDetails = () => {
                navigation.navigate('hospitaldetail', { hospital })
        }

        return (
                <TouchableOpacity
                        onPress={viewDetails}
                        activeOpacity={0.8}
                        style={{
                                flex: 1,
                                position: 'relative',
                                backgroundColor: '#FFFFFF',
                                shadowColor: "#000",
                                shadowOffset: {
                                        width: 0,
                                        height: 2,
                                },
                                shadowOpacity: 0.23,
                                shadowRadius: 2.62,
                                elevation: 4,
                                height: 250,
                                borderRadius: 10,
                                marginBottom: session?.typeUser == 'trabajador' && route?.name == 'hospitals' ? 20 : 10,
                                //width: width * 0.45,
                                //maxWidth: width * 0.45,
                                maxWidth: width / 2 - 30,
                                margin: 10,
                                zIndex: 10,
                        }}>
                        {hospital?.images?.length > 0 ? (
                                <Image
                                        source={{ uri: hospital.images[0] }}
                                        resizeMode='contain'
                                        style={{ width: width / 2 - 30, zIndex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10, aspectRatio: 1 / 1, objectFit: 'contain' }} />
                        ) : (
                                <View style={{ width: width / 2 - 30, alignItems: 'center', justifyContent: 'center',aspectRatio: 1 / 1 }}>
                                        <NoImgVaccineIcon size={60} />
                                </View>
                        )}
                        <Text style={{ color: '#48A2E2', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{hospital.name}</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Ciudad</Text>
                        <Text style={{ color: '#48A2E2', fontSize: 20, textAlign: 'center' }}>{hospital?.address?.city}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                {session?.typeUser == 'trabajador' && route?.name == 'hospitals' && (
                                        <View style={{ width: '100%', flexDirection: 'row', position: 'absolute', bottom: -35, left: 0, zIndex: 5, borderBottomEndRadius: 10, borderBottomStartRadius: 10 }}>
                                                <Button
                                                        color='red'
                                                        icon={<Icon type='antdesign' name='delete' size={20} color='#FFFFFF' />}
                                                        containerStyle={{ paddingTop: 30, width: '50%', alignSelf: 'center', borderBottomLeftRadius: 10 }}
                                                        onPress={() => deleteHospital(hospital._id)}
                                                />
                                                <Button
                                                        color='#48A2E2'
                                                        icon={<Icon type='antdesign' name='edit' size={20} color='#FFFFFF' />}
                                                        containerStyle={{ marginTop: 30, width: '50%', borderBottomRightRadius: 10 }}

                                                />
                                        </View>
                                )}
                        </View>
                </TouchableOpacity >
        )
}

export default CardHospital