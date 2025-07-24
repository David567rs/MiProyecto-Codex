import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { API_URL, CLOUDINARY_URL } from '../utils/constants'

const useChildren = (navigation = null) => {

        const [children, setChildren] = useState([])
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState({})
        const [formChildren, setFormChildren] = useState({})
        const [activeModal, setActiveModal] = useState(false)

        const getChildren = async (id) => {

                try {
                        setLoading(true)
                        const response = await fetch(`${API_URL}/children/parent/${id}`, {
                                method: 'GET',
                        })
                        const data = await response.json()
                        setChildren(data)
                } catch (error) {
                        setError(error)
                } finally {
                        setLoading(false)
                }
        }

        const updateChildren = async (screen) => {

                if (formChildren._id == undefined) {
                        Alert.alert('No se ha seleccionado un hijo')
                        return
                }
                //personalInfoChildren
                if (screen == 1) {
                        if (formChildren.name == "") {
                                Alert.alert('El campo nombre es obligatorio')
                                return
                        }

                        if (formChildren.fatherSurname == "") {
                                Alert.alert('El campo apellido paterno es obligatorio')
                                return
                        }

                        if (formChildren.secondLastName == "") {
                                Alert.alert('El campo apellido materno es obligatorio')
                                return
                        }

                        if (formChildren.gender == "") {
                                Alert.alert('El campo género es obligatorio')
                        }

                        //el  genero debe ser Masculino o Femenino , ningun otro
                        if (formChildren.gender !== "Masculino" && formChildren.gender !== "Femenino") {
                                Alert.alert('El campo género debe ser Masculino o Femenino')
                                return
                        }

                        if (formChildren.age == "") {
                                Alert.alert('El campo edad es obligatorio')
                                return
                        }

                }

                if (screen == 3) {

                        if (formChildren.dateOfBirth == "") {
                                Alert.alert('El campo fecha de nacimiento es obligatorio')
                                return
                        }

                        //el formato de la fecha de nacimiento de nacimiento debe ser MM/DD/YYYY
                        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(formChildren.dateOfBirth)) {
                                Alert.alert('El formato de la fecha de nacimiento debe ser MM/DD/YYYY')
                                return
                        }
                }

                try {
                        setLoading(true)
                        const response = await fetch(`${API_URL}/children/${formChildren._id}`, {
                                method: 'PUT',
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(formChildren),
                        })
                        const data = await response.json()
                        if (data._id) {
                                Alert.alert('Datos actualizados correctamente')
                                setActiveModal(false)
                        }
                        //actualizo los parametros de children
                        navigation.setParams({ children: data })
                        setChildren(data)
                } catch (error) {
                        setError(error)
                } finally {
                        setLoading(false)
                }
        }

        const updateChildrenImage = async (id, image) => {
                try {
                        setLoading(true)

                        const formData = new FormData()
                        formData.append('file', {
                                uri: image.uri,
                                type: image.mimeType || 'image/jpeg',
                                name: image.fileName || 'child.jpg'
                        })

                        const uploadRes = await fetch(`${API_URL}/upload`, {
                                method: 'POST',
                                body: formData
                        })

                        const uploadData = await uploadRes.json()
                        if (uploadData.error) {
                                Alert.alert('Error', 'No se pudo subir la imagen')
                                return
                        }

                        const imageUrl = `${CLOUDINARY_URL}/${uploadData.public_id}`

                        const response = await fetch(`${API_URL}/children/${id}`, {
                                method: 'PUT',
                                headers: {
                                        'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ image: imageUrl })
                        })

                        const data = await response.json()
                        if (data.error) {
                                Alert.alert('Error', data.message?.toString() || 'Error')
                                return
                        }
                        setFormChildren(data)
                        navigation?.setParams({ children: data })
                } catch (e) {
                        console.log(e)
                } finally {
                        setLoading(false)
                }
        }

        return {
                getChildren,
                children,
                loading,
                error,
                updateChildren,
                formChildren,
                setFormChildren,
                updateChildrenImage,
                activeModal,
                setActiveModal
        }
}

export default useChildren