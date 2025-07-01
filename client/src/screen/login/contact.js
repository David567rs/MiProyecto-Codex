import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../styles/login.style'
import { Button, Image, Input } from '@rneui/themed'

const Contact = ({ onSubmitRegister, formRegister, setFormRegister, progressBar, setProgressBar }) => {

        return (
                <>
                        <View style={styles.boxTitle}>
                                <Text style={{
                                        fontSize: 20,
                                        color: '#000000',
                                        fontWeight: 'bold'
                                }}>Seguridad</Text>
                        </View>
                        <View>
                                <Input
                                        leftIcon={<Image source={require('../../../assets/icons/icons8-teléfono-100.png')} style={{ width: 30, height: 30 }} />}
                                        label='Telefono'
                                        onChangeText={(value) => setFormRegister({ ...formRegister, phone: value })}
                                />
                                <Input
                                        leftIcon={<Image source={require('../../../assets/icons/icons8-correo-100.png')} style={{ width: 30, height: 30 }} />}
                                        label='Correo'
                                        onChangeText={(value) => setFormRegister({ ...formRegister, email: value })}
                                />
                                <Input
                                        secureTextEntry={true}
                                        leftIcon={<Image source={require('../../../assets/icons/icons8-candado-100.png')} style={{ width: 30, height: 30 }} />}
                                        label='Contraseña'
                                        onChangeText={(value) => setFormRegister({ ...formRegister, password: value })}
                                />
                                <Input
                                        secureTextEntry={true}
                                        leftIcon={<Image source={require('../../../assets/icons/icons8-candado-100.png')} style={{ width: 30, height: 30 }} />}
                                        label='Confirmar Contraseña'
                                        onChangeText={(value) => setFormRegister({ ...formRegister, confirmPassword: value })}
                                />
                        </View>
                        <View style={styles.containerButtonNext}>
                                <Button 
                                        title='Atras' 
                                        color='red' 
                                        containerStyle={{ width: '40%', borderRadius: 20 }} titleStyle={{ fontWeight: 'bold' }} onPress={() => setProgressBar({
                                        ...progressBar,
                                        positionScreen: 2
                                })} />
                                <Button 
                                        title='Siguiente' 
                                        color='#C1C1C1' 
                                        containerStyle={{ width: '40%', borderRadius: 20 }} titleStyle={{ fontWeight: 'bold' }} disabled />
                        </View>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                                <Button
                                        title='Registrar'
                                        color='#48A2E2'
                                        containerStyle={{ width: '40%', borderRadius: 20 }}
                                        titleStyle={{ fontWeight: 'bold' }}
                                        onPress={()=> onSubmitRegister()}
                                />
                        </View>
                </>
        )
}

export default Contact