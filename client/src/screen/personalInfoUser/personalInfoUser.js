import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Image, ListItem } from '@rneui/themed'
import * as ImagePicker from 'expo-image-picker'
import { GlobalContext } from '../../contexts/globalContext'
import ModalPersonalData from './ModalPersonalData'

const PersonalInfoUser = () => {

        const { session, activeModal, setActiveModal, updateProfileImage } = useContext(GlobalContext)
        const selectImage = async () => {
                try {
                        const result = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                aspect: [1, 1],
                                quality: 1,
                        })

                        if (!result.canceled) {
                                await updateProfileImage(result.assets[0])
                        }
                } catch (e) {
                        console.log(e)
                }
        }

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
                                                <Image source={session?.image ? { uri: session.image } : require('../../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')} style={{ width: 150, height: 150, borderRadius: 100 }} />
                                                <Button
                                                        title='Cambiar foto'
                                                        type='outline'
                                                        onPress={selectImage}
                                                        containerStyle={{ marginTop: 10 }}
                                                />
                                        </View>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>{session?.name} {session?.lastName} {session?.motherLastName}</Text>
                                        <Text style={{ color: '#48A2E2' }}>{session.curp}</Text>
                                        <View style={{ width: '100%' }}>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-parte-delantera-de-tarjeta-bancaria-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>CURP</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{session.curp}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Nombre</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{session?.name}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Apellido Paterno</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{session?.lastName}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Apellido Materno</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{session?.motherLastName}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-sexo-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Sexo</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{session?.gender}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-sexo-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Fecha de Nacimiento</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>{session?.birthDate}</ListItem.Subtitle>
                                                        </ListItem.Content>
                                                </ListItem>
                                                <ListItem onPress={() => console.log("console")} containerStyle={{ paddingVertical: 5 }}>
                                                        <Image source={require('../../../assets/icons/icons8-pastel-100.png')} style={{ width: 30, height: 30 }} />
                                                        <ListItem.Content>
                                                                <ListItem.Title>Edad</ListItem.Title>
                                                                <ListItem.Subtitle style={{ color: '#48A2E2' }}>0</ListItem.Subtitle>
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
                        <ModalPersonalData
                                activeModal={activeModal}
                                setActiveModal={setActiveModal}
                        />
                </>
        )
}

export default PersonalInfoUser