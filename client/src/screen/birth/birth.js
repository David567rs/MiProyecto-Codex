import { View, Text, ScrollView, Dimensions } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Button, Divider, Icon, Image, ListItem } from '@rneui/themed'
import { GlobalContext } from '../../contexts/globalContext'
import useChildren from '../../hooks/useChildren'
import UpdateBirth from './updateBirth'

const { width, height } = Dimensions.get('window')

const Birth = ({ route, navigation }) => {

        const { session } = useContext(GlobalContext)
        const { children } = route.params

        const { updateChildren, formChildren, setFormChildren, setActiveModal, activeModal } = useChildren(navigation)

        const closeModal = () => {
                setActiveModal(false)
        }

        useEffect(() => {
                setFormChildren(children)
        }, [])

        useEffect(() => {
                navigation.setOptions({
                        headerLeft: () => (
                                <Button
                                        color='transparent'
                                        icon={
                                                <Icon
                                                        type='ionicons'
                                                        name='arrow-back'
                                                        size={30}
                                                        color='#FFFFFF'
                                                />
                                        }
                                        onPress={() => navigation.navigate(session?.typeUser == 'trabajador' ? 'profilechildren' : 'children', { children })}
                                />
                        ),
                })
        }, [])

        return (
                <>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 100 }}>
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
                                        marginTop: 10,
                                        gap: 10
                                }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 10 }}>Lugar y Fecha de Nacimiento</Text>
                                        <View style={{ width: '100%', alignItems: 'center', gap: 10 }}>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5, width: 150 }}>
                                                        <Image source={require('../../../assets/icons/icons8-parte-delantera-de-tarjeta-bancaria-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Fecha</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.dateOfBirth}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <View style={{ width: '90%' }}>
                                                        <Divider width={1} color='#C1C1C1' />
                                                </View>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5, width: 150 }}>
                                                        <Image source={require('../../../assets/icons/icons8-parte-delantera-de-tarjeta-bancaria-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>CP</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.zipCode}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <View style={{ width: '90%' }}>
                                                        <Divider width={1} color='#C1C1C1' />
                                                </View>
                                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                                                        <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5, flex: 1, width: width / 2 - 20 }}>
                                                                <Image source={require('../../../assets/icons/icons8-parte-delantera-de-tarjeta-bancaria-100.png')} style={{ width: 30, height: 30 }} />
                                                                <ListItem.Content>
                                                                        <ListItem.Title>Estado</ListItem.Title>
                                                                        <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.state}</ListItem.Subtitle>
                                                                </ListItem.Content>
                                                        </ListItem>
                                                        <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5, width: width / 2 - 20 }}>
                                                                <Image source={require('../../../assets/icons/icons8-parte-delantera-de-tarjeta-bancaria-100.png')} style={{ width: 30, height: 30 }} />
                                                                <ListItem.Content>
                                                                        <ListItem.Title>Ciudad</ListItem.Title>
                                                                        <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.city}</ListItem.Subtitle>
                                                                </ListItem.Content>
                                                        </ListItem>
                                                </View>
                                                <View style={{ width: '90%' }}>
                                                        <Divider width={1} color='#C1C1C1' />
                                                </View>
                                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                                                        <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5, flex: 1, width: width / 2 - 20 }}>
                                                                <Image source={require('../../../assets/icons/icons8-parte-delantera-de-tarjeta-bancaria-100.png')} style={{ width: 30, height: 30 }} />
                                                                <ListItem.Content>
                                                                        <ListItem.Title>Colonia</ListItem.Title>
                                                                        <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.colony}</ListItem.Subtitle>
                                                                </ListItem.Content>
                                                        </ListItem>
                                                        <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5, width: width / 2 - 20 }}>
                                                                <Image source={require('../../../assets/icons/icons8-parte-delantera-de-tarjeta-bancaria-100.png')} style={{ width: 30, height: 30 }} />
                                                                <ListItem.Content>
                                                                        <ListItem.Title>Hospital</ListItem.Title>
                                                                        <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.hospital}</ListItem.Subtitle>
                                                                </ListItem.Content>
                                                        </ListItem>
                                                </View>
                                        </View>
                                        <View style={{ width: '100%', alignItems: 'center', paddingVertical: 20 }}>
                                                <Button
                                                        onPress={() => setActiveModal(true)}
                                                        title='Editar datos' color='#48A2E2' containerStyle={{ width: '60%', borderRadius: 20 }} />
                                        </View>
                                </View>
                        </ScrollView>
                        <UpdateBirth
                                activeModal={activeModal}
                                closeModal={closeModal}
                                updateChildren={updateChildren}
                                formChildren={formChildren}
                                setFormChildren={setFormChildren}
                        />
                </>
        )
}

export default Birth