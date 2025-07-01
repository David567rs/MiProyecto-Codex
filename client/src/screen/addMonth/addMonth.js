import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Circle from '../../components/circle'
import { Input, Image, Button } from '@rneui/themed'
import useVaccine from '../../hooks/useVaccine'
import { NoImgVaccineIcon } from '../../icons/iconsSvg'
import { API_URL, CLOUDINARY_URL } from '../../utils/constants'
import * as ImagePicker from 'expo-image-picker'

const inititalFormMonth = {
        month: ''
}

const AddMonth = ({ route, navigation }) => {

        const { getVaccines, getAllVaccines } = useVaccine()
        const [loading, setLoading] = useState(false)
        const [imagesSelected, setImagesSelected] = useState([])
        const [formMonth, setFormMonth] = useState(inititalFormMonth)

        const [progressBar, setProgressBar] = useState({
                positionScreen: 0
        })

        const [vaccineSelected, setVaccineSelected] = useState([])

        const handleChangeSelect = (vaccine) => {
                const findVaccine = vaccineSelected.find((v) => v._id === vaccine._id)

                if (findVaccine) {
                        setVaccineSelected(vaccineSelected.filter((v) => v._id !== vaccine._id))
                } else {
                        setVaccineSelected([...vaccineSelected, vaccine])
                }
        }

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

        useEffect(() => {
                getAllVaccines()
        }, [])

        const handleChange = (e, name) => {
                setFormMonth({
                        ...formMonth,
                        [name]: e
                })
        }

        const createMonth = async () => {

                if (formMonth.month === '') return Alert.alert('Debes agregar el mes')
                //obtener el _id de las vacunas seleccionadas
                const vaccines = vaccineSelected.map((v) => v._id)

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
                                setLoading(true)
                                //obtengo la primera respuesta del upload 
                                const urlImage = upload ? `${CLOUDINARY_URL}/${upload.public_id}` : ''

                                const response = await fetch(`${API_URL}/vaccine-month`, {
                                        method: 'POST',
                                        headers: {
                                                'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({ ...formMonth, vaccines, image: urlImage })
                                })

                                const results = await response.json()
                                if (results.error || results.statusCode === 400 || results.statusCode === 500) {
                                        Alert.alert(results?.error.toString() || 'Error al agregar el mes, intente de nuevo')
                                        return
                                }

                                setFormMonth(inititalFormMonth)
                                setVaccineSelected([])
                                setImagesSelected([])
                                setProgressBar({
                                        positionScreen: 0
                                })
                                Alert.alert('Mes agregado correctamente')
                                return navigation.navigate('parentandvaccines')
                        } catch (e) {
                                console.log('error vaccine-month ->', e)
                        } finally {
                                setLoading(false)
                        }

                } catch (e) {
                        console.log("error upload ->", e)
                }

        }

        return (
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 80, backgroundColor: '#D8EFEF' }}>
                        <View style={{
                                width: '95%',
                                backgroundColor: '#FFFFFF',
                                shadowColor: "#000",
                                shadowOffset: {
                                        width: 0,
                                        height: 2,
                                },
                                //minHeight: 'auto',
                                shadowOpacity: 0.23,
                                shadowRadius: 2.62,
                                elevation: 4,
                                marginTop: 10,
                                borderRadius: 10
                        }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginVertical: 10 }}>Agregar mes</Text>
                                <View style={{
                                        position: 'relative',
                                        width: '100%',
                                        flexDirection: 'row',
                                        paddingVertical: 20,
                                        alignItems: 'center',
                                }}>
                                        <TouchableOpacity style={{
                                                flex: 1,
                                                alignItems: 'center',
                                        }} onPress={() => setProgressBar({
                                                ...progressBar,
                                                positionScreen: 0
                                        })}>
                                                <Circle />
                                                <Text>Imagenes</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{
                                                flex: 1,
                                                alignItems: 'center',
                                        }} onPress={() => setProgressBar({
                                                ...progressBar,
                                                positionScreen: 1
                                        })}>
                                                <Circle />
                                                <Text numberOfLines={2} style={{ width: 80, textAlign: 'center' }}>Vacunas</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{
                                                flex: 1,
                                                alignItems: 'center',
                                        }} onPress={() => setProgressBar({
                                                ...progressBar,
                                                positionScreen: 2
                                        })}>
                                                <Circle />
                                                <Text numberOfLines={2} style={{ width: 90, textAlign: 'center' }}>Confirmar</Text>
                                        </TouchableOpacity>
                                        <View style={{
                                                position: 'absolute',
                                                width: '70%',
                                                height: 3,
                                                backgroundColor: '#48A2E2',
                                                top: 31,
                                                left: '15%',
                                                zIndex: -1

                                        }} />
                                </View>
                                {progressBar.positionScreen === 0 && (
                                        <>
                                                <View style={{ width: '100%', alignItems: 'center' }}>
                                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Imagen</Text>
                                                        <View
                                                                style={{ borderWidth: 1, borderColor: '#48A2E2', padding: 2, marginVertical: 10, width: 105, aspectRatio: 1 / 1, alignItems: 'center', justifyContent: 'center' }}>
                                                                {imagesSelected.length > 0 ? (
                                                                        imagesSelected.map((image, index) => (
                                                                                <Image key={index} source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />
                                                                        ))
                                                                ) : (
                                                                        <Text style={{ textAlign: 'center', fontSize: 20, color: '#48A2E2' }}>Agregar</Text>
                                                                )}
                                                        </View>
                                                        <Button
                                                                onPress={() => getImages()}
                                                                title='Agregar imagen' containerStyle={{ width: '50%', borderRadius: 20 }} titleStyle={{ fontWeight: 'bold' }} />
                                                        <Input
                                                                label='Mes'
                                                                keyboardType='numeric'
                                                                containerStyle={{ width: '95%' }}
                                                                leftIcon={<Image source={require('../../../assets/icons/icons8-calendario-100.png')} style={{ width: 30, height: 30 }} />}
                                                                onChangeText={(e) => handleChange(e, 'month')}
                                                                value={formMonth.month}
                                                        />
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: 20 }}>
                                                        <Button
                                                                title='Atras'
                                                                containerStyle={{ width: '48%', borderRadius: 20 }}
                                                                color='#CCC'
                                                                disabled={true}
                                                        />
                                                        <Button
                                                                title='Siguiente'
                                                                color='#00935E'
                                                                containerStyle={{ width: '48%', borderRadius: 20 }}
                                                                onPress={() => setProgressBar({
                                                                        ...progressBar,
                                                                        positionScreen: 1
                                                                })}
                                                        />
                                                </View>
                                        </>
                                )}
                        </View>
                        {progressBar.positionScreen === 1 && (
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 10 }}>Seleccionar vacunas</Text>
                                        <Text style={{ width: '100%', textAlign: 'left', fontSize: 15, marginVertical: 10 }}>Vacunas selecionadas {vaccineSelected.length}</Text>
                                        <View style={{ flex: 1, width: '95%', paddingVertical: 20, gap: 20 }}>
                                                {getVaccines.map((vaccine, index) => (
                                                        <TouchableOpacity activeOpacity={0.8} key={vaccine._id}
                                                                onPress={() => handleChangeSelect(vaccine)}
                                                                style={{
                                                                        width: '100%',
                                                                        alignItems: 'center',
                                                                        flexDirection: 'row',
                                                                        justifyContent: 'center',
                                                                        gap: 20,
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
                                                                        height: 'auto'
                                                                }}>
                                                                {vaccine?.images?.length == 0 ? (
                                                                        <View style={{ width: 100, height: 100, alignItems: 'center', justifyContent: 'center' }}>
                                                                                <NoImgVaccineIcon size={60} />
                                                                        </View>
                                                                ) : (
                                                                        <Image source={{ uri: vaccine.images[0] }} style={{ width: 100, height: 100 }} />
                                                                )}
                                                                <View style={{ flex: 1 }}>
                                                                        <View style={{ flexDirection: 'row', height: 'auto', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                                <Text numberOfLines={2} style={{ fontSize: 18, fontWeight: 'bold' }}>{vaccine.name}</Text>
                                                                        </View>
                                                                        <View style={{ flex: 1 }}>
                                                                                <Text style={{ fontSize: 14 }} numberOfLines={5}>{vaccine.description}</Text>
                                                                        </View>
                                                                </View>
                                                                {vaccineSelected.find((v) => v._id === vaccine._id) && (
                                                                        <View style={{ position: 'absolute', width: 25, height: 25, borderRadius: 15, backgroundColor: '#48A2E2', alignItems: 'center', justifyContent: 'center', right: 10, top: 10 }}>
                                                                                <View style={{ width: 20, height: 20, position: 'absolute', borderWidth: 5, borderColor: '#FFF', borderRadius: 10, backgroundColor: '#48A2E2' }}></View>
                                                                        </View>
                                                                )}
                                                        </TouchableOpacity>
                                                ))}
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: 20 }}>
                                                <Button
                                                        title='Atras'
                                                        containerStyle={{ width: '48%', borderRadius: 20 }}
                                                        color='error'
                                                        onPress={() => setProgressBar({
                                                                ...progressBar,
                                                                positionScreen: 0
                                                        })}
                                                />
                                                <Button
                                                        title='Siguiente'
                                                        color='#00935E'
                                                        containerStyle={{ width: '48%', borderRadius: 20 }}
                                                        onPress={() => {
                                                                if (vaccineSelected.length === 0) return Alert.alert('Debes seleccionar al menos una vacuna')
                                                                setProgressBar({
                                                                        ...progressBar,
                                                                        positionScreen: 2
                                                                })
                                                        }}
                                                />
                                        </View>
                                </View>
                        )}
                        {progressBar.positionScreen === 2 && (
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 10 }}>Confirmar</Text>
                                        <View style={{ width: '100%', alignItems: 'center' }}>
                                                <View style={{
                                                        width: 200,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: 20,
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
                                                        height: 250
                                                }}>
                                                        <View
                                                                style={{ borderWidth: 1, borderColor: '#48A2E2', padding: 2, marginVertical: 10, width: 105, aspectRatio: 1 / 1, alignItems: 'center', justifyContent: 'center' }}>
                                                                {imagesSelected.length > 0 ? (
                                                                        imagesSelected.map((image, index) => (
                                                                                <Image key={index} source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />
                                                                        ))
                                                                ) : (
                                                                        <Text style={{ textAlign: 'center', fontSize: 20, color: '#48A2E2' }}>Agregar</Text>
                                                                )}
                                                        </View>
                                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', gap: 10 }}>
                                                                <Text style={{ textAlign: 'left', fontSize: 18 }}>Mes:</Text>
                                                                <Text style={{ textAlign: 'left', fontSize: 18, color: '#48A2E2', fontWeight: 'bold' }}>{formMonth.month}</Text>
                                                        </View>
                                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', gap: 10 }}>
                                                                <Text style={{ textAlign: 'left', fontSize: 18 }}>Vacunas:</Text>
                                                                <Text style={{ textAlign: 'left', fontSize: 18, color: '#48A2E2', fontWeight: 'bold' }}>{vaccineSelected.length}</Text>
                                                        </View>
                                                </View>
                                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 10 }}>Vacunas seleccionadas</Text>
                                                        <View style={{ flex: 1, width: '95%', paddingVertical: 20, gap: 20 }}>
                                                                {vaccineSelected.map((vaccine, index) => (
                                                                        <TouchableOpacity activeOpacity={0.8} key={vaccine._id}
                                                                                style={{
                                                                                        width: '100%',
                                                                                        alignItems: 'center',
                                                                                        flexDirection: 'row',
                                                                                        justifyContent: 'center',
                                                                                        gap: 20,
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
                                                                                        height: 'auto'
                                                                                }}>
                                                                                {vaccine?.images?.length == 0 ? (
                                                                                        <View style={{ width: 100, height: 100, alignItems: 'center', justifyContent: 'center' }}>
                                                                                                <NoImgVaccineIcon size={60} />
                                                                                        </View>
                                                                                ) : (
                                                                                        <Image source={{ uri: vaccine.images[0] }} style={{ width: 100, height: 100 }} />
                                                                                )}
                                                                                <View style={{ flex: 1 }}>
                                                                                        <View style={{ flexDirection: 'row', height: 'auto', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                                                <Text numberOfLines={2} style={{ fontSize: 18, fontWeight: 'bold' }}>{vaccine.name}</Text>
                                                                                        </View>
                                                                                        <View style={{ flex: 1 }}>
                                                                                                <Text style={{ fontSize: 14 }} numberOfLines={5}>{vaccine.description}</Text>
                                                                                        </View>
                                                                                </View>
                                                                                <View style={{ position: 'absolute', width: 25, height: 25, borderRadius: 15, backgroundColor: '#48A2E2', alignItems: 'center', justifyContent: 'center', right: 10, top: 10 }}>
                                                                                        <View style={{ width: 20, height: 20, position: 'absolute', borderWidth: 5, borderColor: '#FFF', borderRadius: 10, backgroundColor: '#48A2E2' }}></View>
                                                                                </View>
                                                                        </TouchableOpacity>
                                                                ))}
                                                        </View>
                                                </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: 20 }}>
                                                <Button
                                                        title='Atras'
                                                        disabled={loading}
                                                        containerStyle={{ width: '48%', borderRadius: 20 }}
                                                        color='error'
                                                        onPress={() => setProgressBar({
                                                                ...progressBar,
                                                                positionScreen: 1
                                                        })}
                                                />
                                                <Button
                                                        title='Guardar'
                                                        color='#48A2E2'
                                                        disabled={loading}
                                                        loading={loading}
                                                        containerStyle={{ width: '48%', borderRadius: 20 }}
                                                        onPress={() => createMonth()}
                                                />
                                        </View>
                                </View>
                        )}
                </ScrollView>
        )
}

export default AddMonth