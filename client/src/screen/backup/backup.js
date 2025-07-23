import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Button, Image, ListItem } from '@rneui/themed'

const Backup = () => {
        
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
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Copia de Seguridad</Text>
                                <Text style={{ fontSize: 18, textAlign: 'center', padding: 10 }}>Un respaldo de seguridad es crucial para prevenir la pérdida de datos, proteger contra ataques cibernéticos, ofreciendo una rápida recuperación ante desastres y errores humanos.</Text>
                                <View style={{ alignItems: 'center' }}>
                                        <Text numberOfLines={2} style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingVertical: 10 }}>Ultima copia de seguridad</Text>
                                        <Text style={{ color: '#48A2E2' }}>02 de Marzo ,1933,2024</Text>
                                </View>
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                        <Button title='Guardar' color='#48A2E2' containerStyle={{ width: '50%', borderRadius: 20, marginVertical: 10 }} titleStyle={{ fontWeight: 'bold' }} />
                                </View>
                                <View style={{ width: '100%',paddingVertical:10 }}>
                                        <ListItem onPress={() => navigation.navigate('birth')} containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                                                <Image source={require('../../../assets/icons/icons8-correo-100.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title>Cuenta de google</ListItem.Title>
                                                        <ListItem.Title style={{color:'#48A2E2'}}>Minamartinezkevin@gmail.om</ListItem.Title>
                                                </ListItem.Content>
                                        </ListItem>
                                        <ListItem onPress={() => navigation.navigate('birth')} containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                                                <Image source={require('../../../assets/icons/icons8-nube-64.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title>Guarda en Google Drive</ListItem.Title>
                                                        <ListItem.Title style={{color:'#48A2E2'}}>Solo cuando toco guardar</ListItem.Title>
                                                </ListItem.Content>
                                        </ListItem>
                                </View>
                        </View>
                </ScrollView>
        )
}

export default Backup