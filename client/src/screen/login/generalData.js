import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../styles/login.style'
import { Button, CheckBox, Image, Input } from '@rneui/themed'

const GeneralData = ({ formRegister, setFormRegister, selectedIndex, setIndex, progressBar, setProgressBar }) => {

        return (
                <>
                        <View style={styles.boxTitle}>
                                <Text style={styles.titleRegister}>Datos Personales</Text>
                                <View style={styles.uploadImage}>
                                        <Image source={require('../../../assets/icons/icons8-tipo-de-piel-masculina-del-usuario-del-círculo-7-96.png')} style={{ width: 120, height: 120 }} />
                                </View>
                                <Text style={styles.subTitle}>Foto de Perfil</Text>
                        </View>
                        <View>
                                <Input
                                        leftIcon={<Image source={require('../../../assets/icons/icons8-parte-delantera-de-tarjeta-bancaria-100.png')} style={{ width: 30, height: 30 }} />}
                                        label='Curp'
                                        onChangeText={(value) => setFormRegister({ ...formRegister, curp: value.toUpperCase() })}
                                        value={formRegister.curp}
                                        maxLength={18}
                                />
                                <Input
                                        leftIcon={<Image source={require('../../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')} style={{ width: 30, height: 30 }} />}
                                        label='Nombre'
                                        onChangeText={(value) => setFormRegister({ ...formRegister, name: value })}
                                        value={formRegister.name}
                                />
                                <Input
                                        leftIcon={<Image source={require('../../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')} style={{ width: 30, height: 30 }} />}
                                        label='Apellido Paterno'
                                        onChangeText={(value) => setFormRegister({ ...formRegister, lastName: value })}
                                        value={formRegister.lastName}
                                />
                                <Input
                                        leftIcon={<Image source={require('../../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')} style={{ width: 30, height: 30 }} />}
                                        label='Apellido Materno'
                                        onChangeText={(value) => setFormRegister({ ...formRegister, motherLastName: value })}
                                        value={formRegister.motherLastName}
                                />
                                <Input
                                        leftIcon={<Image source={require('../../../assets/icons/icons8-calendario-100.png')} style={{ width: 30, height: 30 }} />}
                                        label='Fecha de nacimiento'
                                        onChangeText={(value) => setFormRegister({ ...formRegister, birthDate: value })}
                                        value={formRegister.birthDate}
                                />
                                <View style={styles.containerRadio}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#848C8C' }}>Sexo</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={require('../../../assets/icons/icons8-sexo-100.png')} style={{ width: 30, height: 30 }} />
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <CheckBox
                                                                title='Masculino'
                                                                checked={selectedIndex === 0}

                                                                onPress={() => setIndex(0)}
                                                                checkedIcon="dot-circle-o"
                                                                uncheckedIcon="circle-o"
                                                                iconRight
                                                        />
                                                        <CheckBox
                                                                title='Femenino'
                                                                checked={selectedIndex === 1}
                                                                onPress={() => setIndex(1)}
                                                                checkedIcon="dot-circle-o"
                                                                uncheckedIcon="circle-o"
                                                                iconRight
                                                        />
                                                </View>
                                        </View>
                                </View>
                                <View style={styles.containerButtonNext}>
                                        <Button title='Atras' color='red' containerStyle={{ width: '40%', borderRadius: 20 }} titleStyle={{ fontWeight: 'bold' }} />
                                        <Button title='Siguiente' color='#00935E' containerStyle={{ width: '40%', borderRadius: 20 }} titleStyle={{ fontWeight: 'bold' }} onPress={() => setProgressBar({
                                                ...progressBar,
                                                positionScreen: formRegister.typeUser === 'paciente' ? 2 : 1
                                        })} />
                                </View>
                        </View>
                </>
        )
}

export default GeneralData