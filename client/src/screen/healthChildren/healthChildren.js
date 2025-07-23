import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Button, Icon, Image, ListItem } from '@rneui/themed'
import { GlobalContext } from '../../contexts/globalContext'
import useChildren from '../../hooks/useChildren'
import UpdateHealth from './updateHealth'

const HealthChildren = ({ route, navigation }) => {


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
                                        marginTop: 10
                                }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Salud</Text>
                                        <View style={{ width: '100%' }}>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-regla-100.png')} style={{ width: 30, height: 30, transform: [{ rotate: '-45deg' }] }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Altura</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.height}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-balanza-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Peso</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.weight}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>IMC</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.imc}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-medida-96.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Circunferencia de la cabeza</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.headCircumference}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-mojado-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Grupo sanguineo</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.bloodType}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-mojado-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Factor Rh</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.rhFactor}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <View style={{ width: '100%', alignItems: 'center', padding: 10 }}>
                                                        <Button
                                                                onPress={() => setActiveModal(true)}
                                                                title='Editar datos' color='#48A2E2' containerStyle={{ width: '60%', borderRadius: 20 }} />
                                                </View>
                                        </View>
                                </View>
                        </ScrollView>
                        <UpdateHealth
                                activeModal={activeModal}
                                closeModal={closeModal}
                                updateChildren={updateChildren}
                                formChildren={formChildren}
                                setFormChildren={setFormChildren}
                        />
                </>
        )
}

export default HealthChildren