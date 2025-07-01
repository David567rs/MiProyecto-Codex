import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useContext } from 'react'
import TabScreen from './tabs';
import { Button, Image } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalContext } from '../contexts/globalContext';

const Drawer = createDrawerNavigator();

const DrawerScreen = ({ route, navigation }) => {

        const { session, setSession, setFormLogin } = useContext(GlobalContext)

        const logout = () => {
                //borramos la session del localstorage
                //redirigimos al login
                AsyncStorage.removeItem('session')
                setSession(null)
                setFormLogin({ email: '', password: '' })
                navigation.navigate('login')
        }

        return (
                <Drawer.Navigator
                        screenOptions={{
                                headerShown: false,
                        }}
                        drawerContent={(props) => {
                                return (
                                        <View style={{ flex: 1 }}>
                                                <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#48A2E2', justifyContent: 'center' }}>
                                                        {session?.image != "" ? (
                                                                <Image source={{ uri: session?.image }} style={{ width: 150, height: 150, marginBottom: 10, borderRadius: 100 }} />
                                                        ) : (
                                                                <Image source={require('../../assets/icons/user.png')} style={{ width: 150, height: 150, marginBottom: 10, borderRadius: 100 }} />
                                                        )}
                                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>{session?.name} {session?.lastName} {session?.motherLastName}</Text>
                                                        <Text style={{ fontSize: 16 }}>{session?.email}</Text>
                                                </View>
                                                <View style={{ flex: 2, alignItems: 'flex-start' }}>
                                                        <Button
                                                                onPress={() => navigation.navigate('personalinfouser')}
                                                                icon={<Image source={require('../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')}
                                                                        style={{ width: 30, height: 30 }} />}
                                                                color='transparent' title='Datos personales'
                                                                buttonStyle={{ padding: 5 }}
                                                                titleStyle={{ paddingLeft: 10, color: '#000000' }}
                                                        />
                                                        <Button
                                                                onPress={() => navigation.navigate('domicile')}
                                                                icon={<Image source={require('../../assets/icons/icons8-código-postal-100.png')}
                                                                        style={{ width: 30, height: 30 }} />}
                                                                color='transparent' title='Domicilio'
                                                                buttonStyle={{ padding: 5 }}
                                                                titleStyle={{ paddingLeft: 10, color: '#000000' }}
                                                        />
                                                        <Button
                                                                icon={<Image source={require('../../assets/icons/icons8-teléfono-100.png')}
                                                                        style={{ width: 30, height: 30 }} />}
                                                                color='transparent' title='Contacto'
                                                                buttonStyle={{ padding: 5 }}
                                                                titleStyle={{ paddingLeft: 10, color: '#000000' }}
                                                        />
                                                        <Button
                                                                onPress={() => navigation.navigate('security')}
                                                                icon={<Image source={require('../../assets/icons/icons8-candado-100.png')}
                                                                        style={{ width: 30, height: 30 }} />}
                                                                color='transparent' title='Seguridad'
                                                                buttonStyle={{ padding: 5 }}
                                                                titleStyle={{ paddingLeft: 10, color: '#000000' }}
                                                        />
                                                        <Button
                                                                icon={<Image source={require('../../assets/icons/icons8-campana-100.png')}
                                                                        style={{ width: 30, height: 30 }} />}
                                                                color='transparent' title='Notificaciones'
                                                                buttonStyle={{ padding: 5 }}
                                                                onPress={() => navigation.navigate('notifications')}
                                                                titleStyle={{ paddingLeft: 10, color: '#000000' }}
                                                        />
                                                        {session?.typeUser === 'trabajador' && (
                                                                <Button
                                                                        icon={<Image source={require('../../assets/icons/icons8-imagen-100.png')}
                                                                                style={{ width: 30, height: 30 }} />}
                                                                        color='transparent' title='Slider'
                                                                        buttonStyle={{ padding: 5 }}
                                                                        onPress={() => navigation.navigate('sliders')}
                                                                        titleStyle={{ paddingLeft: 10, color: '#000000' }}
                                                                />
                                                        )}
                                                </View>
                                                <View style={{ alignItems: 'center' }}>
                                                        <Button
                                                                onPress={() => logout()}
                                                                title='Salir'
                                                                containerStyle={{ paddingVertical: 20, width: 100 }}
                                                                buttonStyle={{ borderRadius: 20 }}
                                                                color='error' />
                                                </View>
                                        </View>
                                )
                        }}
                >
                        <Drawer.Screen name="secundary" component={TabScreen} />
                </Drawer.Navigator>
        )
}

export default DrawerScreen