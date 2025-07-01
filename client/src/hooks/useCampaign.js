import React, { useCallback, useState } from 'react'
import { API_URL, CLOUDINARY_URL } from '../utils/constants'
import { Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

const useCampaign = () => {

        const inititalFormCampaign = {
                images: '',
                name: '',
                description: '',
                startdate: '',
                finaldate: '',
                hour: '',
                state: '',
                city: '',
                colony: '',
                sideeffects: '',
                disease: '',
                age: '',
        }

        const [loading, setLoading] = useState(false)
        const [getCampaigns, setGetCampaigns] = useState([])
        const [formCampaign, setFormCampaign] = useState(inititalFormCampaign)

        const [progressBar, setProgressBar] = useState({
                positionScreen: 0
        })

        const [imagesSelected, setImagesSelected] = useState(Array.from({ length: 3 }))
        const [activeIndex, setActiveIndex] = useState(0)

        const handleChange = (e, name) => {
                setFormCampaign({
                        ...formCampaign,
                        [name]: e
                })
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

        const getAllCampaigns = async () => {

                try {
                        setLoading(true)
                        const response = await fetch(`${API_URL}/campaigns`, {
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

                        setGetCampaigns(results)
                } catch (e) {
                        console.log(e)
                } finally {
                        setLoading(false)
                }
        }

        const deleteCampaign = async (id) => {

                Alert.alert('Eliminar', '¿Estas seguro de eliminar la campaña?', [
                        {
                                text: 'Cancelar',
                                style: 'cancel'
                        },
                        {
                                text: 'Eliminar',
                                onPress: async () => {

                                        try {
                                                setLoading(true)
                                                const response = await fetch(`${API_URL}/campaigns/${id}`, {
                                                        method: 'DELETE',
                                                        headers: {
                                                                'Content-Type': 'application/json'
                                                        }
                                                })

                                                const results = await response.json()
                                                if (results.error || results.statusCode === 400 || results.statusCode === 500) {
                                                        Alert.alert(results?.error.toString() || 'Error al eliminar la campaña, intente de nuevo')
                                                        return
                                                }

                                                Alert.alert('Campaña eliminada correctamente')
                                                getAllCampaigns()
                                        } catch (e) {
                                                console.log(e)
                                        } finally {
                                                setLoading(false)
                                        }
                                }
                        }
                ])

        }

        const addCampaign = async (navigation) => {

                const images = imagesSelected.filter(image => image !== undefined)
                if (formCampaign.date === '' || formCampaign.hour === '' || formCampaign.vaccines === '' || formCampaign.disease === '' || formCampaign.population === '' || formCampaign.place === '' || formCampaign.name === '' || formCampaign.description === '') {
                        Alert.alert('Todos los campos son requeridos')
                        return
                }

                formCampaign.startdate = formCampaign.date.split(',')
                formCampaign.finaldate = formCampaign.date.split(',')
                formCampaign.hour = formCampaign.hour.split(',')
                formCampaign.state = formCampaign.place.split(',')
                formCampaign.city = formCampaign.place.split(',')
                formCampaign.colony = formCampaign.place.split(',')
                formCampaign.vaccines = formCampaign.vaccines.split(',')
                formCampaign.disease = formCampaign.disease.split(',')
                formCampaign.population = formCampaign.population.split(',')

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
                                        formCampaign.images = await responseImage.map(image => `${CLOUDINARY_URL}/${image.public_id}`)
                                }

                                const response = await fetch(`${API_URL}/campaigns`, {
                                        method: 'POST',
                                        headers: {
                                                'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(formCampaign)
                                })

                                const results = await response.json()
                                if (results.error || results.statusCode === 400 || results.statusCode === 500) {
                                        Alert.alert(results?.error.toString() || 'Error al agregar la campaña, intente de nuevo')
                                        return
                                }
                                setFormCampaign(inititalFormCampaign)
                                setProgressBar({
                                        positionScreen: 0
                                })
                                setImagesSelected(Array.from({ length: 3 }))
                                setActiveIndex(0)
                                Alert.alert('Campaña agregada correctamente')
                                return navigation.navigate('campaigns')
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

        return {
                loading,
                formCampaign,
                getAllCampaigns,
                handleChange,
                getCampaigns,
                addCampaign,
                deleteCampaign,
                progressBar,
                setProgressBar,
                getImages,
                imagesSelected,
                deleteImage
        }
}

export default useCampaign