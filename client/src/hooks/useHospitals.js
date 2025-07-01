import { useState } from 'react'
import { API_URL, CLOUDINARY_URL } from '../utils/constants'
import { Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

const initialFormHospital = {
        image: '',
        name: '',
        description: '',
        days: '',
        schedule: '',
        longitude: '',
        latitude: '',
        zipCode: '',
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        number: '',
}

const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
const useHospitals = () => {
        const [loading, setLoading] = useState(true)
        const [hospitals, setHospitals] = useState([])
        const [formHospital, setFormHospital] = useState(initialFormHospital)
        const [selectedDays, setSelectedDays] = useState([])
        const [imagesSelected, setImagesSelected] = useState(Array.from({ length: 3 }))
        const [activeIndex, setActiveIndex] = useState(0)

        const getHospitals = async () => {

                try {
                        setLoading(true)
                        const response = await fetch(`${API_URL}/hospitals`, {
                                method: 'GET',
                        })

                        const data = await response.json()

                        if (!data.error) {
                                setHospitals(data)
                                return;
                        }

                } catch (e) {
                        console.log(e)
                } finally {
                        setLoading(false)
                }
        }

        const handleChange = (e, name) => {
                setFormHospital({
                        ...formHospital,
                        [name]: e
                })
        }

        const deleteImage = (index) => {
                const newImages = imagesSelected.filter((image, i) => i !== index)
                setActiveIndex(activeIndex - 1)
                setImagesSelected([...newImages, Array.from({ length: imagesSelected.length - newImages.length })])
        }

        const getImages = async () => {
                setLoading(true)

                if (activeIndex === 3) {
                        Alert.alert('Solo puedes subir 3 imagenes')
                        return;
                }

                try {
                        const results = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                orderedSelection: true,
                                aspect: [1, 1],
                                width: 1000,
                                height: 1000,
                                quality: 1,
                        })


                        if (!results.canceled) {
                                const newImages = [...imagesSelected]
                                newImages[activeIndex] = { ...results.assets[0], id: (Math.random() * 1000).toString() }
                                setImagesSelected(newImages)
                                //setImagesSelected(prev => [...prev, { ...results.assets[0], id: Math.random() }])
                                //setImagesSelected(results.assets)
                                setActiveIndex(activeIndex + 1)
                        }

                } catch (e) {
                        console.log(e)
                } finally {
                        setLoading(false)
                }
        }

        const newHospital = async (navigation) => {

                const images = imagesSelected.filter(image => image !== undefined)
                if (formHospital.name === '' || formHospital.description === '' || formHospital.hour === '' || formHospital.longitude === '' || formHospital.latitude === '' || formHospital.zipCode === '' || formHospital.state === '' || formHospital.city === '' || formHospital.neighborhood === '' || formHospital.street === '' || formHospital.number === '') {
                        Alert.alert('Todos los campos son obligatorios')
                        return
                }

                if (selectedDays.length === 0) {
                        Alert.alert('Selecciona al menos un día')
                }

                if (!formHospital.hour.includes('-')) {
                        Alert.alert('El horario debe tener un formato correcto EJ: 08:00 AM - 16:00 PM')
                        return
                }

                //tranforma de los datos que son string a array
                let dayArray = days.map((day, index) => {
                        if (selectedDays.includes(index)) {
                                return day
                        }
                })

                //elimina los valores undefined
                dayArray = dayArray.filter(day => day)
                formHospital.hour = formHospital.hour.split('-')
                formHospital.days = dayArray
                const { zipCode, state, city, neighborhood, street, number } = formHospital
                const address = { zipCode, state, city, neighborhood, street, number }
                formHospital.address = address
                delete formHospital.zipCode
                delete formHospital.state
                delete formHospital.city
                delete formHospital.neighborhood
                delete formHospital.street
                delete formHospital.number
                try {

                        setLoading(true)
                        let responseImage = [];
                        if (images.length > 0) {
                                for (const image of images) {
                                        const formData = new FormData();
                                        formData.append('file', {
                                                name: image.id,
                                                type: image.mimeType,
                                                uri: image.uri,
                                        });

                                        const responseUpload = await fetch(`${API_URL}/upload`, {
                                                method: 'POST',
                                                body: formData
                                        });
                                        const resultsUpload = await responseUpload.json();
                                        responseImage.push(resultsUpload);
                                }
                        }

                        try {

                                if (responseImage.length > 0) {
                                        formHospital.images = await responseImage.map(image => `${CLOUDINARY_URL}/${image.public_id}`)
                                }

                                const response = await fetch(`${API_URL}/hospitals`, {
                                        method: 'POST',
                                        headers: {
                                                'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(formHospital)
                                })

                                const results = await response.json()

                                if (results.error || results.statusCode === 400 || results.statusCode === 500) {
                                        Alert.alert(results?.message.toString() || 'Error al agregar el hospital, intente de nuevo')
                                        return
                                }

                                setFormHospital(initialFormHospital)
                                getHospitals()
                                setImagesSelected(Array.from({ length: 3 }))
                                setActiveIndex(0)
                                Alert.alert('Hospital agregado correctamente')
                                return navigation.navigate('hospitals')

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

        const deleteHospital = async (id) => {

                Alert.alert('Eliminar', '¿Estás seguro de eliminar el hospital?', [
                        {
                                text: 'No',
                                style: 'cancel'
                        },
                        {
                                text: 'Si',
                                onPress: async () => {

                                        try {
                                                const response = await fetch(`${API_URL}/hospitals/${id}`, {
                                                        method: 'DELETE',
                                                })

                                                const data = await response.json()
                                                if (data.error) {
                                                        Alert.alert('Error al eliminar el hospital, intente de nuevo')
                                                        return
                                                }

                                                Alert.alert('Hospital eliminado correctamente')
                                                getHospitals()
                                                return

                                        } catch (e) {
                                                console.log(e)
                                        }
                                }
                        }
                ])

        }

        return {
                loading,
                hospitals,
                formHospital,
                getHospitals,
                handleChange,
                selectedDays,
                setSelectedDays,
                newHospital,
                days,
                deleteHospital,
                getImages,
                imagesSelected,
                deleteImage
        }

}

export default useHospitals