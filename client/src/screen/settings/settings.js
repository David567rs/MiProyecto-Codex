import { View, Text, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { Image } from '@rneui/base'
import { GlobalContext } from '../../contexts/globalContext'
import { Icon, ListItem } from '@rneui/themed'

const Settings = ({ route, navigation }) => {

        const { session } = useContext(GlobalContext)

        return (
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 100 }}>
                        <View style={{
                                width: '95%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                shadowColor: "#000",
                                shadowOffset: {
                                        width: 0,
                                        height: 2,
                                },
                                marginTop: 10,
                                shadowOpacity: 0.23,
                                shadowRadius: 2.62,
                                elevation: 4,
                                borderRadius: 10,
                                paddingVertical: 10,
                                backgroundColor: '#FFFFFF',
                                paddingHorizontal: 10,
                        }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', paddingVertical: 10 }}>Mi perfil</Text>
                                <View style={{ width: '100%', flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
                                        <Image source={require('../../../assets/icons/user.png')} style={{ width: 150, height: 150, borderRadius: 100 }} />
                                </View>
                                <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold', margin: 0 }}>{session?.name} {session?.lastName} {session?.motherLastName}</Text>
                                <Text style={{ fontSize: 16, color: '#48A2E2', margin: 0 }}>{session?.email}</Text>
                                <View style={{ width: '100%', paddingVertical: 10 }}>
                                        <ListItem containerStyle={{ paddingVertical: 5 }} onPress={()=> navigation.navigate('personalinfouser')}>
                                                <Image source={require('../../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title style={{ fontSize: 18 }}>Datos personales</ListItem.Title>
                                                </ListItem.Content>
                                                <ListItem.Chevron color='#48A2E2' size={30} />
                                        </ListItem>
                                        {session?.typeUser == 'trabajador' && (
                                                <ListItem containerStyle={{ paddingVertical: 5 }} onPress={()=> navigation.navigate('profession')}>
                                                        <Image source={require('../../../assets/icons/icons8-trabajo-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title style={{ fontSize: 18 }}>Profesión</ListItem.Title>
                                                        </ListItem.Content>
                                                        <ListItem.Chevron color='#48A2E2' size={30} />
                                                </ListItem>
                                        )}
                                        <ListItem containerStyle={{ paddingVertical: 5 }} onPress={()=> navigation.navigate('domicile')}>
                                                <Image source={require('../../../assets/icons/icons8-código-postal-100.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title style={{ fontSize: 18 }}>Domicilio</ListItem.Title>
                                                </ListItem.Content>
                                                <ListItem.Chevron color='#48A2E2' size={30} />
                                        </ListItem>
                                        <ListItem containerStyle={{ paddingVertical: 5 }}>
                                                <Image source={require('../../../assets/icons/icons8-candado-100.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title style={{ fontSize: 18 }}>Seguridad</ListItem.Title>
                                                </ListItem.Content>
                                                <ListItem.Chevron color='#48A2E2' size={30} />
                                        </ListItem>
                                        {session?.typeUser == 'trabajador' && (
                                                <>
                                                        <ListItem containerStyle={{ paddingVertical: 5 }} onPress={() => navigation.navigate('hospitals')}>
                                                                <Image source={require('../../../assets/icons/icons8-hospital-64(2).png')} style={{ width: 30, height: 30 }} />
                                                                <ListItem.Content>
                                                                        <ListItem.Title style={{ fontSize: 18 }}>Hospitales</ListItem.Title>
                                                                </ListItem.Content>
                                                                <ListItem.Chevron color='#48A2E2' size={30} />
                                                        </ListItem>
                                                        <ListItem containerStyle={{ paddingVertical: 5 }} onPress={() => navigation.navigate('sliders')}>
                                                                <Image source={require('../../../assets/icons/icons8-imagen-100.png')} style={{ width: 30, height: 30 }} />
                                                                <ListItem.Content>
                                                                        <ListItem.Title style={{ fontSize: 18 }}>Slider</ListItem.Title>
                                                                </ListItem.Content>
                                                                <ListItem.Chevron color='#48A2E2' size={30} />
                                                        </ListItem>

                                                        {session?.profession?.toLowerCase().includes('doctor') && (
                                                                <ListItem containerStyle={{ paddingVertical: 5 }} onPress={() => navigation.navigate('sendhealthreport')}>
                                                                        <Image source={require('../../../assets/icons/icons8-correo-100.png')} style={{ width: 30, height: 30 }} />
                                                                        <ListItem.Content>
                                                                                <ListItem.Title style={{ fontSize: 18 }}>Enviar reporte</ListItem.Title>
                                                                        </ListItem.Content>
                                                                        <ListItem.Chevron color='#48A2E2' size={30} />
                                                                </ListItem>
                                                        )}
                                                </>
                                        )}
                                </View>
                        </View>
                </ScrollView>
        )
}

export default Settings