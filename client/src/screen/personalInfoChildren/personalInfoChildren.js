import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Icon, Image } from '@rneui/themed'
import * as ImagePicker from 'expo-image-picker'
import { ListItem } from '@rneui/base'
import { GlobalContext } from '../../contexts/globalContext'
import UpdatePersonalInfo from './updatePersonalInfo'
import useChildren from '../../hooks/useChildren'

const PersonalInfoChildren = ({ route, navigation }) => {

        const { session } = useContext(GlobalContext)
        const { children } = route.params
        const {
                updateChildren,
                updateChildrenImage,
                formChildren,
                setFormChildren,
                setActiveModal,
                activeModal,
        } = useChildren(navigation)

        const closeModal = () => {
                setActiveModal(false)
        }

        const selectImage = async () => {
                try {
                        const result = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                aspect: [1, 1],
                                quality: 1,
                        })

                        if (!result.canceled) {
                                await updateChildrenImage(children._id, result.assets[0])
                        }
                } catch (e) {
                        console.log(e)
                }
        }

        useEffect(() => {
                setFormChildren(children)
        }, [])

        useEffect(() => {
                navigation.setOptions({
                        headerTitle: session?.typeUser == 'trabajador' ? 'Padre-Hijo' : 'Hijos',
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
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, paddingVertical: 5 }}>Datos Personales</Text>
                                        <View style={{ alignItems: 'center' }}>
                                                {children?.image && children?.image !== "" ? (
                                                        <Image source={{ uri: children.image }} style={{ width: 150, height: 150, borderRadius: 75 }} />
                                                ) : (
                                                        <Text style={{ width: 150, height: 150, borderWidth: 1, borderRadius: 75, borderColor: '#48A2E2' }}></Text>
                                                )}
                                                 <Button
                                                        title='Cambiar foto'
                                                        type='outline'
                                                        onPress={selectImage}
                                                        containerStyle={{ marginTop: 10 }}
                                                />
                                        </View>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>{children?.name} {children?.lastName} {children?.secondLastName}</Text>
                                        <Text style={{ color: '#48A2E2' }}>{children?.curp}</Text>
                                        <View style={{ width: '100%' }}>
                                                <ListItem containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-parte-delantera-de-tarjeta-bancaria-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>CURP</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.curp}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Nombre</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.name}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Apellido Paterno</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.lastName}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Apellido Materno</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.secondLastName}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem  containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-sexo-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Sexo</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.gender}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-pastel-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Edad</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{children?.age}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <View style={{ width: '100%', alignItems: 'center', padding: 10 }}>
                                                        <Button
                                                                onPress={() => setActiveModal(true)}
                                                                title='Editar datos'
                                                                color='#48A2E2'
                                                                containerStyle={{ width: '60%', borderRadius: 20 }} />
                                                </View>
                                        </View>
                                </View>
                        </ScrollView>
                        <UpdatePersonalInfo
                                activeModal={activeModal}
                                closeModal={closeModal}
                                updateChildren={updateChildren}
                                formChildren={formChildren}
                                setFormChildren={setFormChildren}
                        />
                </>
        )
}

export default PersonalInfoChildren