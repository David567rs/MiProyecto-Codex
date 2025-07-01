import { View, Text, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { Button } from '@rneui/base'
import { Image, ListItem } from '@rneui/themed'
import { GlobalContext } from '../../contexts/globalContext'
import ModalProfession from './modalProfession'

const Profession = ({ route, navigation }) => {

        const { session, setActiveModal3 } = useContext(GlobalContext)

        return (
                <>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 80 }}>
                                <View style={{
                                        width: '95%', backgroundColor: '#FFFFFF', shadowColor: "#000",
                                        shadowOffset: {
                                                width: 0,
                                                height: 2,
                                        },
                                        shadowOpacity: 0.23,
                                        shadowRadius: 2.62,
                                        elevation: 4,
                                        borderRadius: 10,
                                        paddingVertical: 10,
                                        alignItems: 'center',
                                        marginTop: 10
                                }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, paddingVertical: 5 }}>Profesión</Text>
                                        <View style={{ width: '100%' }}>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-parte-delantera-de-tarjeta-bancaria-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>ID del trabajador</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{session?.idWorker}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-trabajo-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Profesión</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{session?.profession}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-parte-delantera-de-tarjeta-bancaria-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Cedula</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{session?.cedula || 'Sin datos'}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-organización-80.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Institución</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{session?.institution}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-enfermera-80.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Puesto</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{session?.position}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <View style={{ width: '100%', alignItems: 'center', padding: 10 }}>
                                                        <Button
                                                                onPress={() => setActiveModal3(true)}
                                                                title='Editar datos' color='#48A2E2' containerStyle={{ width: '60%', borderRadius: 20 }} />
                                                </View>
                                        </View>
                                </View>
                        </ScrollView>
                        <ModalProfession />
                </>
        )
}

export default Profession