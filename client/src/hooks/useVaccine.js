import React, { useState } from 'react'
import { Alert } from 'react-native'
import { API_URL, CLOUDINARY_URL } from '../utils/constants'
import * as ImagePicker from 'expo-image-picker'

const inititalFormVaccine = {
        images: '',
        name: '',
        description: '',
        disease: '',
        gravity: '',
        dose: '',
        application: '',
        town: '',
        contraindications: '',
        area: '',
}

const useVaccine = () => {

        const [loading, setLoading] = useState(false)
        const [buttonSelected, setButtonSelected] = useState(0)
        const [getVaccines, setGetVaccines] = useState([])
        const [formVaccine, setFormVaccine] = useState(inititalFormVaccine)
        const [imagesSelected, setImagesSelected] = useState(Array.from({ length: 3 }))
        const [activeIndex, setActiveIndex] = useState(0)

        const [progressBar, setProgressBar] = useState({
                positionScreen: 0,
        });

        const handleChange = (e, name) => {
                setFormVaccine({
                        ...formVaccine,
                        [name]: e
                })
        }

        const getAllVaccines = async () => {

                try {
                        setLoading(true)
                        const response = await fetch(`${API_URL}/vaccines`, {
                                method: 'GET',
                                headers: {
                                        'Content-Type': 'application/json'
                                }
                        })

                        const results = await response.json()
                        if (results.error || results.statusCode === 400 || results.statusCode === 500) {
                                Alert.alert(results?.error.toString() || 'Error al obtener los articulos, intente de nuevo')
                                return
                        }

                        setGetVaccines(results)
                } catch (e) {
                        console.log(e)
                } finally {
                        setLoading(false)
                }

        }

        const addVaccine = async (navigation) => {

                const images = imagesSelected.filter(image => image !== undefined)

                if (formVaccine.disease === '' || formVaccine.dose === '' || formVaccine.application === '' || formVaccine.town === '') {
                        Alert.alert('Todos los campos son obligatorios')
                        return
                }

                formVaccine.disease = formVaccine.disease.split(',')
                formVaccine.application = formVaccine.application.split(',')
                formVaccine.town = formVaccine.town.split(',')
                formVaccine.area = formVaccine.area.split(',')
                formVaccine.gravity = buttonSelected === 0 ? 'Mal' : buttonSelected === 1 ? 'Regular' : 'Excelente'
                formVaccine.contraindications = formVaccine.contraindications.split(',')

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
                                        formVaccine.images = await responseImage.map(image =>  `${CLOUDINARY_URL}/${image.public_id}`)
                                }

                                const response = await fetch(`${API_URL}/vaccines`, {
                                        method: 'POST',
                                        headers: {
                                                'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(formVaccine)
                                })

                                const results = await response.json()
                                if (results.error || results.statusCode === 400 || results.statusCode === 500) {
                                        Alert.alert(results?.message.toString() || 'Error al agregar el articulo, intente de nuevo')
                                        return
                                }

                                setFormVaccine(inititalFormVaccine)
                                Alert.alert('Vacuna agregada correctamente')
                                setProgressBar({
                                        positionScreen: 0
                                })
                                setActiveIndex(0)
                                setImagesSelected(Array.from({ length: 3 }))
                                navigation.navigate('vaccinesmedic')
                        } catch (e) {
                                console.log(e)
                        }
                        finally {
                                setLoading(false)
                        }

                } catch (e) {
                        console.log(e)
                } finally {
                        setLoading(false)
                }

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

        const deleteImage = (index) => {
                const newImages = imagesSelected.filter((image, i) => i !== index)
                setActiveIndex(activeIndex - 1)
                setImagesSelected([...newImages, Array.from({ length: imagesSelected.length - newImages.length })])
        }

        return {
                handleChange,
                addVaccine,
                formVaccine,
                setFormVaccine,
                getVaccines,
                setGetVaccines,
                buttonSelected,
                setButtonSelected,
                getAllVaccines,
                loading,
                progressBar,
                setProgressBar,
                imagesSelected,
                setImagesSelected,
                getImages,
                deleteImage

        }
}

export default useVaccine