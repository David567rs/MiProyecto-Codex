import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@rneui/themed'

const AddSlider = () => {

        const [images, setImages] = useState([])
        const [loading, setLoading] = useState(false)

        return (
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 80 }}>

                        <Button
                                title='Agregar Imagenes'
                                color='#48A2E2'
                                titleStyle={{ fontWeight: 'bold' }}
                                containerStyle={{ borderRadius: 20, width: 150 }} />
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                                <Button
                                        title='Guardar'
                                        color='#48A2E2'
                                        titleStyle={{ fontWeight: 'bold' }}
                                        containerStyle={{ borderRadius: 20, width: 150 }} />
                        </View>
                </ScrollView>
        )
}

export default AddSlider