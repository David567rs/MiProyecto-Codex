import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Icon, Image, Input, CheckBox } from '@rneui/themed'
import * as ImagePicker from 'expo-image-picker'
import { API_URL, CLOUDINARY_URL } from '../../utils/constants'
import { GlobalContext } from '../../contexts/globalContext'

const inititalFormChildren = {
        curp: '',
        name: '',
        lastName: '',
        secondLastName: '',
        birthdate: '',
        gender: 0,
}

const AddChildren = ({ route, navigation }) => {

        const { session } = useContext(GlobalContext)
        const [loading, setLoading] = useState(false)
        const [imagesSelected, setImagesSelected] = useState([])
        const [formChildren, setFormChildren] = useState(inititalFormChildren)

        const getImages = async () => {
                setLoading(true)
                try {
                        const results = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                selectionLimit: 1,
                                //allowsMultipleSelection: true,
                                aspect: [1, 1],
                                height: 1000,
                                width: 1000,
                                quality: 1,
                        })

                        if (!results.canceled) {
                                setImagesSelected(results.assets)
                                //setImagesSelected(results.uri ? [results] : results.selected)
                        }

                } catch (e) {
                        console.log(e)
                } finally {
                        setLoading(false)
                }
        }

        const handleChange = (e, field) => {
                setFormChildren({ ...formChildren, [field]: e })
        }

        const registerChildren = async () => {
                console.log('Registrar')

                //validaciones
                if (formChildren.name == "") {
                        Alert.alert('El nombre es obligatorio')
                        return
                }

                if (formChildren.lastName == "") {
                        Alert.alert('El apellido paterno es obligatorio')
                        return
                }

                if (formChildren.secondLastName == "") {
                        Alert.alert('El apellido materno es obligatorio')
                        return
                }

                if (formChildren.dateOfBirth == "") {
                        Alert.alert('La fecha de nacimiento es obligatoria')
                        return
                }

                //la fecha de nacimiento debe tener formato dd/mm/aaaa
                const dateOfBirth = formChildren.dateOfBirth.split('/')

                if (dateOfBirth.length != 3) {
                        Alert.alert('La fecha de nacimiento debe tener el formato dd/mm/aaaa')
                        return
                }
                //enviar datos
                let upload = null

                try {
                        setLoading(true)
                        if (imagesSelected.length > 0) {

                                const formData = new FormData()
                                formData.append('file', {
                                        uri: imagesSelected[0].uri,
                                        type: imagesSelected[0].mimeType,
                                        name: 'image-vaccine-month.jpg'
                                })

                                const responseUpload = await fetch(`${API_URL}/upload`, {
                                        method: 'POST',
                                        body: formData
                                })

                                upload = await responseUpload.json()
                        }

                        try {

                                const urlImage = upload ? `${CLOUDINARY_URL}/${upload.public_id}` : ''

                                const response = await fetch(`${API_URL}/children`, {
                                        method: 'POST',
                                        headers: {
                                                'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                                parentId: session._id,
                                                curp: formChildren.curp,
                                                name: formChildren.name,
                                                lastName: formChildren.lastName,
                                                secondLastName: formChildren.secondLastName,
                                                dateOfBirth: formChildren.dateOfBirth,
                                                gender: formChildren.gender == 1 ? 'Femenino' : 'Masculino',
                                                image: urlImage
                                        })
                                })

                                const results = await response.json()
                                console.log(results)
                                if (results.error || results.statusCode === 400 || results.statusCode === 500) {
                                        Alert.alert(results?.error.toString() || 'Error al agregar el hijo, intente de nuevo')
                                        return
                                }

                                setFormChildren(inititalFormChildren)
                                setImagesSelected([])
                                Alert.alert('Hijo registrado correctamente')
                                navigation.navigate('children')
                        } catch (e) {
                                console.log(e)
                        } finally {
                                setLoading(false)
                        }
                } catch (e) {
                        console.log(e)
                } finally {
                        setLoading(false)
                }


        }

        return (
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 80 }} >
                        <View style={{
                                width: '95%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 10,
                                shadowColor: "#000",
                                shadowOffset: {
                                        width: 0,
                                        height: 2,
                                },
                                shadowOpacity: 0.23,
                                shadowRadius: 2.62,
                                elevation: 4,
                                borderRadius: 10,
                                paddingVertical: 10,
                                backgroundColor: '#FFFFFF',
                                paddingHorizontal: 10,
                        }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Datos generales</Text>
                                <View style={{ width: '100', aspectRatio: 1 / 1, marginVertical: 20 }}>
                                        {imagesSelected.length > 0 ? (
                                                <Image source={{ uri: imagesSelected[0].uri }} style={{ width: 150, height: 150, borderRadius: 75 }} />
                                        ) : (
                                                <Text style={{ width: 150, height: 150, borderWidth: 1, borderRadius: 75, borderColor: '#48A2E2' }}></Text>
                                        )}
                                        <Button
                                                size='sm'
                                                color='transparent'
                                                onPress={() => getImages()}
                                                containerStyle={{ position: 'absolute', bottom: 0, right: 0, borderRadius: 20, backgroundColor: '#48A2E2', width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
                                                icon={<Icon type='antdesign' name='camera' size={20} color='#FFFFFF' />}
                                        />
                                </View>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#848C8C' }}>Foto de perfil</Text>
                                <View style={{ flex: 1, width: '100%', paddingTop: 30 }}>
                                        <Input
                                                label='Curp(Opcional)'
                                                keyboardType='default'
                                                autoFocus
                                                containerStyle={{ width: '100%' }}

                                                leftIcon={<Image source={require('../../../assets/icons/icons8-parte-delantera-de-tarjeta-bancaria-100.png')} style={{ width: 30, height: 30 }} />}
                                                onChangeText={(e) => handleChange(e, 'curp')}
                                                value={formChildren.curp}
                                        />
                                        <Input
                                                label='Nombre'
                                                keyboardType='default'
                                                containerStyle={{ width: '100%' }}
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')} style={{ width: 30, height: 30 }} />}
                                                onChangeText={(e) => handleChange(e, 'name')}
                                                value={formChildren.name}
                                        />
                                        <Input
                                                label='Apellido Paterno'
                                                keyboardType='default'
                                                containerStyle={{ width: '100%' }}
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')} style={{ width: 30, height: 30 }} />}
                                                onChangeText={(e) => handleChange(e, 'lastName')}
                                                value={formChildren.lastName}
                                        />
                                        <Input
                                                label='Apellido Materno'
                                                keyboardType='default'
                                                containerStyle={{ width: '100%' }}
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')} style={{ width: 30, height: 30 }} />}
                                                onChangeText={(e) => handleChange(e, 'secondLastName')}
                                                value={formChildren.secondLastName}
                                        />
                                        <Input
                                                label='Fecha de nacimiento'
                                                keyboardType='default'
                                                placeholder='dd/mm/aaaa'
                                                containerStyle={{ width: '100%' }}
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')} style={{ width: 30, height: 30 }} />}
                                                onChangeText={(e) => handleChange(e, 'dateOfBirth')}
                                                value={formChildren.dateOfBirth}
                                        />
                                        <View style={{
                                                justifyContent: 'space-around',
                                                paddingHorizontal: 10,
                                        }}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#848C8C' }}>Sexo</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Image source={require('../../../assets/icons/icons8-sexo-100.png')} style={{ width: 30, height: 30 }} />
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <CheckBox
                                                                        title='Masculino'
                                                                        checked={formChildren.gender === 0}
                                                                        onPress={() => handleChange(0, 'gender')}
                                                                        checkedIcon="dot-circle-o"
                                                                        uncheckedIcon="circle-o"
                                                                        iconRight
                                                                />
                                                                <CheckBox
                                                                        title='Femenino'
                                                                        checked={formChildren.gender === 1}
                                                                        onPress={() => handleChange(1, 'gender')}
                                                                        checkedIcon="dot-circle-o"
                                                                        uncheckedIcon="circle-o"
                                                                        iconRight
                                                                />
                                                        </View>
                                                </View>
                                        </View>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 20, paddingBottom: 40, paddingTop: 20 }}>
                                        <Button
                                                title='Cancelar'
                                                color='transparent'
                                                containerStyle={{ backgroundColor: 'red', borderRadius: 20, paddingHorizontal: 20 }}
                                        />
                                        <Button
                                                title='Registrar'
                                                color='transparent'
                                                loading={loading}
                                                disabled={loading}
                                                onPress={() => registerChildren()}
                                                containerStyle={{ backgroundColor: '#48A2E2', borderRadius: 20, paddingHorizontal: 20 }}
                                        />
                                </View>
                        </View>
                </ScrollView >
        )
}

export default AddChildren