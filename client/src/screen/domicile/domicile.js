import { View, Text, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { Button, Image, ListItem } from '@rneui/themed'
import { GlobalContext } from '../../contexts/globalContext'
import ModalDomicile from './modalDomicile'

const Domicile = () => {

        const { session, setActiveModal2 } = useContext(GlobalContext)

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
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, paddingVertical: 5 }}>Domicilio</Text>
                                        <View style={{ width: '100%' }}>
                                                <ListItem bottomDivider >
                                                        <Image source={require('../../../assets/icons/icons8-código-postal-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>CP</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{session?.address?.cp}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                        <Image source={require('../../../assets/icons/icons8-ayuntamiento-de-los-angeles-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Estado</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{session?.address?.state}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem bottomDivider>
                                                        <Image source={require('../../../assets/icons/icons8-ciudad-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Ciudad</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{session?.address?.city}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                        <Image source={require('../../../assets/icons/icons8-compra-entregada-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Colonia</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{session?.address?.colony}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem>
                                                        <Image source={require('../../../assets/icons/icons8-ciudad-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Calle</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{session?.address?.street}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                        <Image source={require('../../../assets/icons/icons8-hashtag-grande-96.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Numero</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{session?.address?.number}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <View style={{ width: '100%', alignItems: 'center', padding: 10 }}>
                                                        <Button
                                                                onPress={() => setActiveModal2(true)}
                                                                title='Editar datos' color='#48A2E2' containerStyle={{ width: '60%', borderRadius: 20 }} />
                                                </View>
                                        </View>
                                </View>
                        </ScrollView>
                        <ModalDomicile />
                </>
        )
}

export default Domicile