import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Image, Input, TabView } from '@rneui/themed'
import { Link } from '@react-navigation/native'
import { styles } from '../../styles/login.style'
import { GlobalContext } from '../../contexts/globalContext'

const TabLogin = ({ navigation }) => {

        const { onSubmitLogin, formLogin, setFormLogin,loading,setLoading } = useContext(GlobalContext)

        return (
                <TabView.Item style={{ flex: 1 }}>
                        <ScrollView keyboardDismissMode='interactive'>
                                <View style={styles.boxLogin}>
                                        <Text style={styles.titleLogin}>Iniciar Sesión</Text>
                                        <View style={{ width: 100, height: 100 }}>
                                                <Image source={require('../../../assets/icons/user.png')} style={{ width: 100, height: 100 }} />
                                        </View>
                                        <Input
                                                onChangeText={(e) => setFormLogin({ ...formLogin, email: e })}
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-correo-100.png')} style={{ width: 30, height: 30 }} />}
                                                label='Correo' />
                                        <Input
                                                onChangeText={(e) => setFormLogin({ ...formLogin, password: e })}
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-candado-100.png')} style={{ width: 30, height: 30 }} />}
                                                label='Contraseña' secureTextEntry />
                                        <Link to={{ screen: 'recovery' }} style={{ width: '100%', padding: 0, color: '#48A2E2', fontWeight: 'bold', fontSize: 14, textAlign: 'right', paddingRight: 10 }}>Olvide mi contraseña</Link>
                                        <Button
                                                title={loading ? 'Iniciando...' : 'Acceder'}
                                                color='#48A2E2'
                                                containerStyle={styles.submitButton}
                                                loading={loading}
                                                disabled={loading}
                                                titleStyle={styles.submitButtonTitle}
                                                onPress={() => onSubmitLogin(navigation)}
                                        />
                                </View>
                        </ScrollView>
                </TabView.Item>
        )
}

export default TabLogin