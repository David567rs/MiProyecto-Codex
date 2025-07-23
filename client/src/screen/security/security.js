import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Image, ListItem } from '@rneui/themed'

const Security = ({ route, navigation }) => {
        return (
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 100 }}>
                        <View style={{
                                width: '95%', alignItems: 'center', backgroundColor: '#FFFFFF', shadowColor: "#000",
                                shadowOffset: {
                                        width: 0,
                                        height: 2,
                                },
                                shadowOpacity: 0.23,
                                shadowRadius: 2.62,
                                elevation: 4,
                                borderRadius: 10,
                                paddingVertical: 10,
                        }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Seguridad</Text>
                                <Image source={require('../../../assets/icons/icons8-privado-2-100.png')} style={{ width: 100, height: 100, marginVertical: 20 }} />
                                <Text style={{ fontSize: 18, textAlign: 'center', padding: 10 }}>Es de vital importancia cuidar tu
                                        información para evitar fraudes </Text>
                                <View style={{ width: '100%', paddingVertical: 10 }}>
                                        <ListItem containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                                                <Image source={require('../../../assets/icons/icons8-correo-100.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title>Correo</ListItem.Title>
                                                        <ListItem.Subtitle style={{ color: '#48A2E2' }}>Minamartinezkevin@gmail.om</ListItem.Subtitle>
                                                </ListItem.Content>
                                        </ListItem>
                                        <ListItem containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                                                <Image source={require('../../../assets/icons/icons8-teléfono-100.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title>Teléfono</ListItem.Title>
                                                        <ListItem.Subtitle style={{ color: '#48A2E2' }}>7713227666</ListItem.Subtitle>
                                                </ListItem.Content>
                                        </ListItem>
                                        <ListItem containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                                                <Image source={require('../../../assets/icons/icons8-candado-100.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title>Contraseña</ListItem.Title>
                                                        <ListItem.Subtitle style={{ color: '#48A2E2' }}>************</ListItem.Subtitle>
                                                </ListItem.Content>
                                        </ListItem>
                                        <ListItem containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                                                <Image source={require('../../../assets/icons/icons8-bloquear-phonelink-100.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title>Doble factor</ListItem.Title>
                                                        <ListItem.Subtitle style={{ color: '#48A2E2' }}>Desactivado</ListItem.Subtitle>
                                                </ListItem.Content>
                                        </ListItem>
                                        <ListItem onPress={() => navigation.navigate('backup')} containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                                                <Image source={require('../../../assets/icons/icons8-círculo-de-diseño-de-esquema-lleno-de-marketing-de-respaldo-externo-y-seo-64(1).png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title>Copia de Seguridad</ListItem.Title>
                                                </ListItem.Content>
                                                <ListItem.Chevron color='#48A2E2' size={30} />
                                        </ListItem>
                                </View>
                        </View>
                </ScrollView>
        )
}

export default Security