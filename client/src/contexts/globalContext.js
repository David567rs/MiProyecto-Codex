import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { API_URL, CLOUDINARY_URL } from "../utils/constants";
import { Alert } from "react-native";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

        const [activeModal, setActiveModal] = useState(false)
        const [activeModal2, setActiveModal2] = useState(false)
        const [activeModal3, setActiveModal3] = useState(false)
        const [session, setSession] = useState(null)
        const [loading, setLoading] = useState(false)

        const [formLogin, setFormLogin] = useState({
                email: '',
                password: ''
        })

        const onChangeUser = (field, value) => {

                if(field.includes('.')){
                        const [field1, field2] = field.split('.')
                        setSession({ 
                                ...session, [field1]: { ...session[field1], [field2]: value } 
                        })
                        return
                }

                setSession({ 
                        ...session, [field]: value 
                })
        }

        const onSubmitLogin = async (navigation) => {

                if (formLogin.email.trim() === '' || formLogin.password.trim() === '') {
                        Alert.alert('Todos los campos son obligatorios')
                        return
                }

                try {
                        setLoading(true)
                        const response = await fetch(`${API_URL}/auth/login`, {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(formLogin)
                        })

                        const result = await response.json()
                        if (result.error || result.statusCode === 401) {
                                Alert.alert("Error", result.message)
                                return;
                        }

                        setFormLogin({ email: '', password: '' })
                        delete result.password
                        await AsyncStorage.setItem('session', JSON.stringify(result))
                        setSession(result)
                        navigation.navigate('principal')
                } catch (e) {
                        console.log(e)
                } finally {
                        setLoading(false)
                }
        }


        const updateUser = async () => {
                try {
                        setLoading(true)
            
                        const response = await fetch(`${API_URL}/users/${session._id}`, {
                                method: 'PUT',
                                headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${session.token}`
                                },
                                body: JSON.stringify(session)
                        })

                        const result = await response.json()
                        if (result.error) {
                                Alert.alert('Error', result.message.toString())
                                return;
                        }

                        delete result.password
                        AsyncStorage.setItem('session', JSON.stringify(result))
                        setSession(result)
                        setActiveModal(false)
                        setActiveModal2(false)
                        setActiveModal3(false)
                        Alert.alert('Datos actualizados correctamente')
                } catch (e) {
                        console.log(e)
                } finally {
                        setLoading(false)
                }
        }
        const updateProfileImage = async (image) => {
                try {
                        setLoading(true)
                        const formData = new FormData()
                        formData.append('file', {
                                uri: image.uri,
                                type: image.mimeType || 'image/jpeg',
                                name: image.fileName || 'profile.jpg'
                        })

                        const uploadResponse = await fetch(`${API_URL}/upload`, {
                                method: 'POST',
                                body: formData
                        })

                        const uploadResult = await uploadResponse.json()
                        if (uploadResult.error) {
                                Alert.alert('Error', 'No se pudo subir la imagen')
                                return
                        }

                        const imageUrl = `${CLOUDINARY_URL}/${uploadResult.public_id}`

                        const response = await fetch(`${API_URL}/users/${session._id}`, {
                                method: 'PUT',
                                headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${session.token}`
                                },
                                body: JSON.stringify({ image: imageUrl })
                        })

                        const result = await response.json()
                        if (result.error) {
                                Alert.alert('Error', result.message.toString())
                                return
                        }

                        delete result.password
                        AsyncStorage.setItem('session', JSON.stringify(result))
                        setSession(result)
                        Alert.alert('Foto de perfil actualizada')
                } catch (e) {
                        console.log(e)
                } finally {
                        setLoading(false)
                }
        }

        const verifySession = async () => {
                try {
                        setLoading(true)
                        const session = await AsyncStorage.getItem('session')
                        if (session) {
                                setSession(JSON.parse(session))
                        }
                } catch (e) {
                        console.log(e)
                } finally {
                        setLoading(false)
                }
        }

        useEffect(() => {
                verifySession()
        }, [])

        const data = {
                onSubmitLogin,
                setFormLogin,
                formLogin,
                session,
                loading,
                setLoading,
                setSession,
                verifySession,
                onChangeUser,
                updateUser,
                updateProfileImage,
                activeModal,
                setActiveModal,
                activeModal2,
                setActiveModal2,
                activeModal3,
                setActiveModal3
        }

        return (
                <GlobalContext.Provider value={data}>
                        {children}
                </GlobalContext.Provider>
        )
};

export { GlobalContext, GlobalProvider };
