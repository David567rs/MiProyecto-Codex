import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Button, Image, Input, TabView } from '@rneui/themed'

const TabPhone = ({ navigation }) => {

        return (
                <TabView.Item style={{ flex: 1 }}>
                        <ScrollView keyboardDismissMode='interactive'>
                                <View style={{
                                        flex: 1,
                                        alignItems: 'center'
                                }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 10 }}>Recuperar contraseña</Text>
                                        <Image source={require('../../../assets/icons/candado.png')} style={{ width: 130, height: 130 }} />
                                        <Text numberOfLines={2} style={{ paddingHorizontal: 20, textAlign: 'center', fontSize: 16 }}>Ingresa tu teléfono con terminación ******7666 para poder recuperar tu cuenta</Text>
                                        <Input
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-correo-100.png')} style={{ width: 30, height: 30 }} />}
                                                label='Telefono'
                                                keyboardType='phone-pad'
                                        />
                                        <Button
                                                onPress={() => navigation.navigate('entercode')}
                                                title='Enviar'
                                                color='#48A2E2'
                                                containerStyle={{ width: '60%', borderRadius: 20 }}
                                                titleStyle={{ fontWeight: 'bold' }}
                                        />
                                </View>
                        </ScrollView>
                </TabView.Item>
        )
}

export default TabPhone