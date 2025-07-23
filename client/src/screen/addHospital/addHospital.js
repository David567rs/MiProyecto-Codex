import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Button, ButtonGroup, Image, Input } from '@rneui/themed'
import useHospitals from '../../hooks/useHospitals'

const AddHospital = ({ route, navigation }) => {

        const { formHospital, newHospital, handleChange, selectedDays, setSelectedDays, days, loading, imagesSelected, getImages,deleteImage } = useHospitals()
        const [progressBar, setProgressBar] = useState({
                positionScreen: 0
        })

        const Circle = () => {
                return (
                        <View style={{ width: 25, height: 25, backgroundColor: '#FFFFFF', borderRadius: 50, borderWidth: 3, alignItems: 'center', justifyContent: 'center', borderColor: '#48A2E2' }}>
                                <Text style={{ width: 10, height: 10, backgroundColor: '#48A2E2', borderRadius: 10 }} />
                        </View>
                )
        }

        return (
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 100, backgroundColor: '#D8EFEF' }}>
                        <View style={{
                                width: '95%',
                                backgroundColor: '#FFFFFF',
                                shadowColor: "#000",
                                shadowOffset: {
                                        width: 0,
                                        height: 2,
                                },
                                minHeight: '70%',
                                shadowOpacity: 0.23,
                                shadowRadius: 2.62,
                                elevation: 4,
                                marginTop: 10,
                                borderRadius: 10
                        }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginVertical: 10 }}>Agregar articulo sobre Hospital</Text>
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
                                                <Text numberOfLines={2} style={{ width: 80, textAlign: 'center' }}>Datos generales</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{
                                                flex: 1,
                                                alignItems: 'center',
                                        }} onPress={() => setProgressBar({
                                                ...progressBar,
                                                positionScreen: 2
                                        })}>
                                                <Circle />
                                                <Text numberOfLines={2} style={{ width: 90, textAlign: 'center' }}>Datos Adicionales</Text>
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
                                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Imagenes</Text>
                                                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, gap: 10 }}>
                                                                {imagesSelected.map((image, index) => (
                                                                        image?.uri ? (
                                                                                <View
                                                                                        key={image.id}
                                                                                        style={{ position: 'relative', width: 90, borderWidth: 1, borderColor: '#48A2E2', padding: 2, marginVertical: 10, aspectRatio: 1 / 1, alignItems: 'center', justifyContent: 'center' }}>
                                                                                        <Image key={index} source={{ uri: image.uri }} style={{ width: 90, aspectRatio: 1 / 1 }} />
                                                                                        <Button
                                                                                                onPress={() => deleteImage(index)}
                                                                                                title='X'
                                                                                                color='error'
                                                                                                containerStyle={{ position: 'absolute', width: 30, height: 30, top: 0, right: 0 }}
                                                                                                buttonStyle={{ padding: 0 }} />
                                                                                </View>
                                                                        ) : (
                                                                                <View
                                                                                        key={index}
                                                                                        style={{ width: 90, borderWidth: 1, borderColor: '#48A2E2', padding: 2, marginVertical: 10, aspectRatio: 1 / 1, alignItems: 'center', justifyContent: 'center' }}>
                                                                                        <Text key={index} style={{ textAlign: 'center', fontSize: 20, color: '#48A2E2' }}>{index + 1}</Text>
                                                                                </View>
                                                                        )
                                                                ))}
                                                        </View>
                                                        <Button title='Agregar imagen' onPress={() => getImages()} containerStyle={{ width: '50%', borderRadius: 20 }} titleStyle={{ fontWeight: 'bold' }} />
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
                                {progressBar.positionScreen === 1 && (
                                        <View style={{ width: '100%', alignItems: 'center' }}>
                                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Datos Generales</Text>
                                                <View style={{ width: '100%', alignItems: 'center' }}>
                                                        <Input
                                                                label='Nombre'
                                                                containerStyle={{ width: '95%' }}
                                                                leftIcon={<Image source={require('../../../assets/icons/icons8-cubes-64.png')} style={{ width: 30, height: 30 }} />}
                                                                onChangeText={(e) => handleChange(e, 'name')}
                                                                value={formHospital.name}
                                                        />
                                                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Gravedad</Text>
                                                        <Input
                                                                label='Descripcion'
                                                                containerStyle={{ width: '95%' }}
                                                                numberOfLines={8}
                                                                multiline={true}
                                                                leftIcon={<Image source={require('../../../assets/icons/icons8-bloc-100.png')} style={{ width: 30, height: 30 }} />}
                                                                placeholder='Descripcion del hospital'
                                                                onChangeText={(e) => handleChange(e, 'description')}
                                                                value={formHospital.description}
                                                        />
                                                        <View style={{ width: '95%' }}>
                                                                <View style={{ paddingLeft: 15, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                                                        <Image source={require('../../../assets/icons/icons8-calendario-100.png')} style={{ width: 30, height: 30 }} />
                                                                        <Text style={{ fontWeight: 'bold', color: 'gray' }}>Dias</Text>
                                                                </View>
                                                                <ButtonGroup
                                                                        buttons={days}
                                                                        selectMultiple
                                                                        selectedIndexes={selectedDays}
                                                                        //buttonStyle={{ padding: 10}}
                                                                        onPress={(value) => {
                                                                                setSelectedDays(value);
                                                                        }}
                                                                        containerStyle={{ marginBottom: 20 }}
                                                                />
                                                        </View>
                                                        <Input
                                                                label='Horario'
                                                                containerStyle={{ width: '95%' }}
                                                                leftIcon={<Image source={require('../../../assets/icons/icons8-reloj-64_2.png')} style={{ width: 30, height: 30 }} />}
                                                                placeholder='Ej: 8:00 am - 12:00 pm'
                                                                onChangeText={(e) => handleChange(e, 'hour')}
                                                                value={formHospital.hour}
                                                        />
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
                                                                onPress={() => setProgressBar({
                                                                        ...progressBar,
                                                                        positionScreen: 2
                                                                })}
                                                        />
                                                </View>
                                        </View>
                                )}

                                {progressBar.positionScreen === 2 && (
                                        <View style={{ width: '100%', alignItems: 'center' }}>
                                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Datos Adicionales</Text>
                                                <View style={{ width: '100%', alignItems: 'center' }}>
                                                        <Input
                                                                label='Longitud'
                                                                containerStyle={{ width: '95%' }}
                                                                keyboardType='number-pad'
                                                                leftIcon={<Image source={require('../../../assets/icons/icons8-globo-terráqueo-64.png')} style={{ width: 30, height: 30 }} />}
                                                                placeholder='Ej: 206297405365524721'
                                                                onChangeText={(e) => handleChange(e, 'longitude')}
                                                                value={formHospital.longitude}
                                                        />
                                                        <Input
                                                                label='Latitud'
                                                                containerStyle={{ width: '95%' }}
                                                                keyboardType='number-pad'
                                                                leftIcon={<Image source={require('../../../assets/icons/icons8-globo-terráqueo-64.png')} style={{ width: 30, height: 30 }} />}
                                                                onChangeText={(e) => handleChange(e, 'latitude')}
                                                                value={formHospital.latitude}
                                                        />
                                                        <Input
                                                                label='Dirección'
                                                                containerStyle={{ width: '95%' }}
                                                                keyboardType='number-pad'
                                                                leftIcon={<Image source={require('../../../assets/icons/icons8-código-postal-100.png')} style={{ width: 30, height: 30 }} />}
                                                                placeholder='CP'
                                                                onChangeText={(e) => handleChange(e, 'zipCode')}
                                                                value={formHospital.zipCode}
                                                        />
                                                        <Input
                                                                label='Estado'
                                                                containerStyle={{ width: '95%' }}
                                                                leftIcon={<Image source={require('../../../assets/icons/icons8-ayuntamiento-de-los-angeles-100.png')} style={{ width: 30, height: 30 }} />}
                                                                onChangeText={(e) => handleChange(e, 'state')}
                                                                numberOfLines={2}
                                                                value={formHospital.state}
                                                        />
                                                        <Input
                                                                label='Ciudad'
                                                                containerStyle={{ width: '95%' }}
                                                                numberOfLines={2}
                                                                leftIcon={<Image source={require('../../../assets/icons/icons8-ciudad-100.png')} style={{ width: 30, height: 30 }} />}
                                                                onChangeText={(e) => handleChange(e, 'city')}
                                                                value={formHospital.city}
                                                        />
                                                        <Input
                                                                label='Colonia'
                                                                containerStyle={{ width: '95%' }}
                                                                numberOfLines={2}
                                                                leftIcon={<Image source={require('../../../assets/icons/icons8-compra-entregada-100.png')} style={{ width: 30, height: 30 }} />}
                                                                onChangeText={(e) => handleChange(e, 'neighborhood')}
                                                                value={formHospital.neighborhood}
                                                        />
                                                        <Input
                                                                label='Calle'
                                                                containerStyle={{ width: '95%' }}
                                                                numberOfLines={2}
                                                                leftIcon={<Image source={require('../../../assets/icons/icons8-calle-100.png')} style={{ width: 30, height: 30 }} />}
                                                                onChangeText={(e) => handleChange(e, 'street')}
                                                                value={formHospital.street}
                                                        />
                                                        <Input
                                                                label='Numero'
                                                                keyboardType='number-pad'
                                                                containerStyle={{ width: '95%' }}
                                                                numberOfLines={2}
                                                                leftIcon={<Image source={require('../../../assets/icons/icons8-hashtag-grande-96.png')} style={{ width: 30, height: 30 }} />}
                                                                onChangeText={(e) => handleChange(e, 'number')}
                                                                value={formHospital.number}
                                                        />
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: 20 }}>
                                                        <Button
                                                                title='Atras'
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
                                                                loading={loading}
                                                                disabled={loading}
                                                                containerStyle={{ width: '48%', borderRadius: 20 }}
                                                                onPress={() => newHospital(navigation)}
                                                        />
                                                </View>
                                        </View>
                                )}
                        </View>

                </ScrollView>
        )
}

export default AddHospital