import { View, Text } from 'react-native'
import React from 'react'
import { Button, Icon, Image } from '@rneui/themed'

const Card = () => {
        return (
                <View style={{ flex: 1, width: '100%', height: 'auto', gap: 20 }}>
                        <View style={{ flex: 1, flexDirection: 'row', gap: 20 }}>
                                <View style={{
                                        flex: 1, borderRadius: 10, overflow: 'hidden', height: 300,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                                width: 0,
                                                height: 2,
                                        },
                                        shadowOpacity: 0.23,
                                        shadowRadius: 2.62,
                                        elevation: 4,
                                        backgroundColor: '#FFFFFF'
                                }}>
                                        <Image source={require('../../../assets/S1.png')} style={{ width: '100%', height: 200 }} />
                                        <Text style={{ textAlign: 'center', padding: 10, fontWeight: 'bold', fontSize: 20, color: '#48A2E2' }}>Influenza</Text>
                                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Fecha:</Text>
                                        <Text style={{ textAlign: 'center', fontSize: 16, color: '#48A2E2' }}>30 a 31 de octubre</Text>
                                </View>
                                <View style={{
                                        flex: 1, borderRadius: 10, overflow: 'hidden', height: 300, shadowColor: "#000",
                                        shadowOffset: {
                                                width: 0,
                                                height: 2,
                                        },
                                        shadowOpacity: 0.23,
                                        shadowRadius: 2.62,
                                        elevation: 4,
                                        backgroundColor: '#FFFFFF'
                                }}>
                                        <Image source={require('../../../assets/S1.png')} style={{ width: '100%', height: 200 }} />
                                        <Text style={{ textAlign: 'center', padding: 10, fontWeight: 'bold', fontSize: 20, color: '#48A2E2' }}>Influenza</Text>
                                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Fecha:</Text>
                                        <Text style={{ textAlign: 'center', fontSize: 16, color: '#48A2E2' }}>30a 31 de octubre</Text>
                                </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
                                <View style={{
                                        flex: 1, borderRadius: 10, overflow: 'hidden', height: 300, shadowColor: "#000",
                                        shadowOffset: {
                                                width: 0,
                                                height: 2,
                                        },
                                        shadowOpacity: 0.23,
                                        shadowRadius: 2.62,
                                        elevation: 4,
                                        backgroundColor: '#FFFFFF'
                                }}>
                                        <Image source={require('../../../assets/S1.png')} style={{ width: '100%', height: 200 }} />
                                        <Text style={{ textAlign: 'center', padding: 10, fontWeight: 'bold', fontSize: 20, color: '#48A2E2' }}>Influenza</Text>
                                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Fecha:</Text>
                                        <Text style={{ textAlign: 'center', fontSize: 16, color: '#48A2E2' }}>30a 31 de octubre</Text>
                                </View>
                                <View style={{
                                        flex: 1, borderRadius: 10, overflow: 'hidden', height: 300, shadowColor: "#000",
                                        shadowOffset: {
                                                width: 0,
                                                height: 2,
                                        },
                                        shadowOpacity: 0.23,
                                        shadowRadius: 2.62,
                                        elevation: 4,
                                        backgroundColor: '#FFFFFF'
                                }}>
                                        <Image source={require('../../../assets/S1.png')} style={{ width: '100%', height: 200 }} />
                                        <Text style={{ textAlign: 'center', padding: 10, fontWeight: 'bold', fontSize: 20, color: '#48A2E2' }}>Influenza</Text>
                                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Fecha:</Text>
                                        <Text style={{ textAlign: 'center', fontSize: 16, color: '#48A2E2' }}>30a 31 de octubre</Text>
                                </View>
                        </View>
                        <View style={{ width: '100%',alignItems:'center' }}>
                                <View style={{ width: '90%', height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                                        <Button color='transparent' icon={<Icon type='antdesign' name='left' color='#48A2E2'/>}/>
                                        <View style={{ gap: 10, flexDirection: 'row' }}>
                                                <Text style={{ width: 30, height: 30, borderWidth: 1, borderRadius: 5, borderColor: '#48A2E2', color: '#FFFFFF', backgroundColor: '#48A2E2', textAlign: 'center', paddingTop: 3, fontSize: 18, fontWeight: 'bold' }}>1</Text>
                                                <Text style={{ width: 30, height: 30, borderWidth: 1, borderRadius: 5, borderColor: '#48A2E2', color: '#48A2E2', textAlign: 'center', paddingTop: 3, fontSize: 18, fontWeight: 'bold' }}>2</Text>
                                                <Text style={{ width: 30, height: 30, borderWidth: 1, borderRadius: 5, borderColor: '#48A2E2', color: '#48A2E2', textAlign: 'center', paddingTop: 3, fontSize: 18, fontWeight: 'bold' }}>3</Text>
                                        </View>
                                        <Button color='transparent' icon={<Icon type='antdesign' name='right' color='#48A2E2'/>} />
                                </View>
                        </View>
                </View>
        )
}

export default Card