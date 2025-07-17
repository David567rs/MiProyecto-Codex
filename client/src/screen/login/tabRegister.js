import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TabView } from '@rneui/base'
import { Button, CheckBox, Input, Overlay } from '@rneui/themed'
import { styles } from '../../styles/login.style'
import GeneralData from './generalData'
import Domicile from './domicile'
import Contact from './contact'
import WorkerData from './workerData'
import { API_URL } from '../../utils/constants'

const inititalForm = {
        curp: '',
        image: '',
        name: '',
        lastName: '',
        motherLastName: '',
        birthDate: '',
        gender: '',
        idWorker: '',
        profession: '',
        typeUser: 'paciente',
        celula: '',
        institution: '',
        position: '',
        address: {
                cp: '',
                state: '',
                city: '',
                colony: '',
                street: '',
                number: '',
        },
        phone: '',
        email: '',
        typeUser: '',
        password: '',
        confirmPassword: ''
}

const TabRegister = ({ tabSelected, setTabSelected }) => {

        const [selectedIndex, setIndex] = useState(0);
        const [formRegister, setFormRegister] = useState(inititalForm);
        const [modalVisible, setModalVisible] = useState(false);

        useEffect(() => {
                if (tabSelected === 1) {
                        setModalVisible(true)
                        setProgressBar({
                                positionScreen: 0
                        })
                }
        }, [tabSelected])

        const [progressBar, setProgressBar] = useState({
                positionScreen: 0,
        });

        const validateTextField = (text) => {
                const regex = /^[A-Za-z]+$/;
                return regex.test(text);
        };

        const validateCURP = (curp) => {
                //const regex = /^[A-Z]{4}\d{6}[A-Z]{6}\d{2}$/;
                 // El formato de la CURP consta de 18 caracteres:
                // 4 letras, 6 números que representan la fecha de nacimiento
                // y 8 caracteres alfanuméricos correspondientes a entidad,
                // género y homoclave. Permitimos cualquier combinación
                // alfanumérica válida para los últimos 8 dígitos.
                const regex = /^[A-Z]{4}\d{6}[A-Z0-9]{8}$/;
                return regex.test(curp);
        };


        const onSubmitRegister = async () => {


                setFormRegister({
                        ...formRegister,
                        gender: selectedIndex == 0 ? 'Masculino' : 'Femenino'
                })

                if (!formRegister.curp) {
                        Alert.alert('El campo curp es obligatorio');
                        return;
                } else if (!validateCURP(formRegister.curp)) {
                        Alert.alert('El campo curp no es válido');
                        return;
                }
                
                const validateTextField = (text) => {
                const regex = /^[A-Za-z]+$/;
                return regex.test(text);
                };
                
                if (!formRegister.name) {
                        Alert.alert('El campo nombre es obligatorio');
                        return;
                } else if (!validateTextField(formRegister.name)) {
                        Alert.alert('El campo nombre solo debe contener letras');
                        return;
                }

                if (!formRegister.lastName) {
                        Alert.alert('El campo apellido paterno es obligatorio');
                        return;
                } else if (!validateTextField(formRegister.lastName)) {
                        Alert.alert('El campo apellido paterno solo debe contener letras');
                        return;
                }

                if (!formRegister.motherLastName) {
                        Alert.alert('El campo apellido materno es obligatorio');
                        return;
                } else if (!validateTextField(formRegister.motherLastName)) {
                        Alert.alert('El campo apellido materno solo debe contener letras');
                        return;
                }

                if (formRegister.birthDate == "") {
                        Alert.alert('El campo fecha de nacimiento es obligatorio')
                        return;
                }

                if (formRegister.gender == "") {
                        Alert.alert('El campo genero es obligatorio')
                        return;
                }

                if (formRegister.typeUser == "") {
                        Alert.alert('El campo tipo de usuario es obligatorio')
                        return;
                }

                if (formRegister.address.cp == "") {
                        Alert.alert('El campo codigo postal es obligatorio')
                        return;
                }

                if (formRegister.address.state == "") {
                        Alert.alert('El campo estado es obligatorio')
                        return;
                }

                if (formRegister.address.city == "") {
                        Alert.alert('El campo ciudad es obligatorio')
                        return;
                }

                if (formRegister.address.colony == "") {
                        Alert.alert('El campo colonia es obligatorio')
                        return;
                }

                if (formRegister.address.street == "") {
                        Alert.alert('El campo calle es obligatorio')
                        return;
                }

                if (formRegister.address.number == "") {
                        Alert.alert('El campo numero es obligatorio')
                        return;
                }

                if (formRegister.phone == "") {
                        Alert.alert('El campo telefono es obligatorio')
                        return;
                }

                if (formRegister.email == "") {
                        Alert.alert('El campo correo es obligatorio')
                        return;
                }

                if (formRegister.password == "") {
                        Alert.alert('El campo contraseña es obligatorio')
                        return;
                }

                if (formRegister.confirmPassword == "") {
                        Alert.alert('El campo confirmar contraseña es obligatorio')
                        return;
                }

                if (formRegister.password != formRegister.confirmPassword) {
                        Alert.alert('Las contraseñas no coinciden')
                        return;
                }

                delete formRegister.confirmPassword;
                const response = await fetch(`${API_URL}/users`, {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formRegister)
                })

                const result = await response.json()
                if (result.error) {
                        Alert.alert(result.error.toString())
                        return;
                }

                Alert.alert('Usuario registrado correctamente')
                setTabSelected(0)
                setModalVisible(false)
                setFormRegister(inititalForm)
                setProgressBar({
                        positionScreen: 0
                })

        }


        const validationTypeUser = () => {
                if (formRegister.typeUser === '') {
                        Alert.alert('Selecciona un tipo de usuario')
                        return;
                }
                else {
                        setModalVisible(false)
                }
        }

        const onSubmitProgressPlus = () => {
                setProgressBar({
                        ...progressBar,
                        positionScreen: progressBar.positionScreen + 1
                })
        }

        const onSubmitProgressLess = () => {
                setProgressBar({
                        ...progressBar,
                        positionScreen: progressBar.positionScreen - 1
                })
        }

        const Circle = () => {
                return (
                        <View style={{ width: 25, height: 25, backgroundColor: '#FFFFFF', borderRadius: 50, borderWidth: 3, alignItems: 'center', justifyContent: 'center', borderColor: '#48A2E2' }}>
                                <Text style={{ width: 10, height: 10, backgroundColor: '#48A2E2', borderRadius: 10 }} />
                        </View>
                )
        }

        return (
                <>
                        <TabView.Item style={{ flex: 1 }}>
                                <ScrollView keyboardDismissMode='interactive'>
                                        <View style={styles.progressBar}>
                                                <TouchableOpacity style={styles.boxPoint} onPress={() => setProgressBar({
                                                        ...progressBar,
                                                        positionScreen: 0
                                                })}>
                                                        <Circle position={progressBar.positionScreen} />
                                                        <Text>Datos generales</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.boxPoint} onPress={() => setProgressBar({
                                                        ...progressBar,
                                                        positionScreen: 1
                                                })}>
                                                        <Circle />
                                                        <Text>Domicilio</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.boxPoint} onPress={() => setProgressBar({
                                                        ...progressBar,
                                                        positionScreen: 2
                                                })}>
                                                        <Circle />
                                                        <Text>Contacto</Text>
                                                </TouchableOpacity>
                                                <View style={styles.lineProgress} />
                                        </View>
                                        {progressBar.positionScreen === 0 && (
                                                <GeneralData
                                                        formRegister={formRegister}
                                                        setFormRegister={setFormRegister}
                                                        progressBar={progressBar}
                                                        setProgressBar={setProgressBar}
                                                        selectedIndex={selectedIndex}
                                                        setIndex={setIndex}
                                                />
                                        )}
                                        {progressBar.positionScreen === 1 && (
                                                <WorkerData
                                                        onSubmitRegister={onSubmitRegister}
                                                        formRegister={formRegister}
                                                        setFormRegister={setFormRegister}
                                                        progressBar={progressBar}
                                                        setProgressBar={setProgressBar}
                                                />
                                        )}

                                        {progressBar.positionScreen === 2 && (
                                                <Domicile
                                                        formRegister={formRegister}
                                                        setFormRegister={setFormRegister}
                                                        progressBar={progressBar}
                                                        setProgressBar={setProgressBar}
                                                />
                                        )}

                                        {progressBar.positionScreen === 3 && (
                                                <Contact
                                                        onSubmitRegister={onSubmitRegister}
                                                        formRegister={formRegister}
                                                        setFormRegister={setFormRegister}
                                                        progressBar={progressBar}
                                                        setProgressBar={setProgressBar}
                                                />
                                        )}
                                </ScrollView>
                        </TabView.Item>
                        <Overlay isVisible={modalVisible} onBackdropPress={() => { }} overlayStyle={{ width: '80%', height: 'auto' }}>
                                <View>
                                        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', paddingVertical: 20 }}>Tipo de usuario</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 100 }}>
                                                <CheckBox title='Paciente'
                                                        checked={formRegister.typeUser === 'paciente'}
                                                        onPress={() => setFormRegister({ ...formRegister, typeUser: 'paciente' })}
                                                />
                                                <CheckBox title='Trabajador'
                                                        checked={formRegister.typeUser === 'trabajador'}
                                                        onPress={() => setFormRegister({ ...formRegister, typeUser: 'trabajador' })}
                                                />
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20, paddingBottom: 20 }}>
                                                <Button
                                                        title='Cancelar'
                                                        color='error'
                                                        containerStyle={{ borderRadius: 30, width: 100 }}
                                                        onPress={() => {
                                                                setTabSelected(0)
                                                                setModalVisible(false)
                                                        }}
                                                />
                                                <Button
                                                        title='Aceptar'
                                                        color='#48A2E2'
                                                        onPress={() => validationTypeUser()}
                                                        containerStyle={{ borderRadius: 30, width: 100 }}
                                                />
                                        </View>
                                </View>
                        </Overlay>
                </>
        )
}

export default TabRegister