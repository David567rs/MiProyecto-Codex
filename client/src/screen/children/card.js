import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from '@rneui/themed'

const Card = ({ navigation, children = {} }) => {

        return (
                <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('profilechildren', { children })}
                        style={{
                                width: '100%', justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: 'white', borderRadius: 10, marginBottom: 10, shadowColor: "#000",
                                shadowOffset: {
                                        width: 0,
                                        height: 2,
                                },
                                shadowOpacity: 0.23,
                                shadowRadius: 2.62,
                                elevation: 4,
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                                {children?.image && children?.image !== '' ? (
                                        <Image source={{ uri: children.image }} style={{ width: 100, height: 100 }} />
                                ) : (
                                        <View style={{ width: 100, height: 100 }}></View>
                                )}
                                <View style={{ marginLeft: 10, flex: 1 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{children.name} {children.lastName} {children.secondLastName}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontSize: 15 }}>Curp: </Text>
                                                <Text style={{ fontSize: 15, color: '#48A2E2' }}>{children?.curp}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ fontSize: 15 }}>Edad: </Text>
                                                        <Text style={{ fontSize: 15, color: '#48A2E2' }}>{children?.age} {children?.ageUnit}</Text>
                                                </View>
                                                <Image source={require('../../../assets/icons/icons8-de-acuerdo-96.png')} style={{ width: 25, height: 25 }} />
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Estado</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ width: 30, height: 15, borderWidth: 0.4, backgroundColor: 'red' }} />
                                                        <Text style={{ width: 30, height: 15, borderWidth: 0.4, backgroundColor: 'red' }} />
                                                        <Text style={{ width: 30, height: 15, borderWidth: 0.4, backgroundColor: 'yellow' }} />
                                                        <Text style={{ width: 30, height: 15, borderWidth: 0.4, backgroundColor: 'yellow' }} />
                                                        <Text style={{ width: 30, height: 15, borderWidth: 0.4, backgroundColor: 'green' }} />
                                                        <Text style={{ width: 30, height: 15, borderWidth: 0.4, backgroundColor: 'green' }} />
                                                </View>
                                        </View>
                                        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                                                <Text style={{ width: 60, textAlign: 'center', fontSize: 12, fontWeight: 'bold', color: 'red' }}>Mal</Text>
                                                <Text style={{ width: 60, textAlign: 'center', fontSize: 12, fontWeight: 'bold', color: 'orange' }}>Regular</Text>
                                                <Text style={{ width: 60, textAlign: 'center', fontSize: 12, fontWeight: 'bold', color: 'green' }}>Excelente</Text>
                                        </View>
                                </View>
                        </View>
                </TouchableOpacity >
        )
}

export default Card