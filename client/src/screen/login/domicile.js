import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../styles/login.style'
import { Button, Image, Input } from '@rneui/themed'

const Domicile = ({ formRegister, setFormRegister, setProgressBar, progressBar }) => {

        return (
                <>
                        <View style={styles.boxTitle}>
                                <Text style={{
                                        fontSize: 20,
                                        color: '#000000',
                                        fontWeight: 'bold'
                                }}>Domicilio</Text>
                        </View>
                        <View>
                                <View style={{ flexDirection: 'row' }}>
                                        <Input
                                                containerStyle={{ flex: 1 }}
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-código-postal-100.png')} style={{ width: 30, height: 30 }} />}
                                                label='CP'
                                                keyboardType='numeric'
                                                onChangeText={(value) => {
                                                        if (/^\d*$/.test(value) && value.length <= 5) {
                                                                setFormRegister({ ...formRegister, address: { ...formRegister.address, cp: value } });
                                                        }
                                                }}
                                                value={formRegister.address.cp}
                                        />
                                        <Input
                                                containerStyle={{ flex: 1 }}
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-ayuntamiento-de-los-angeles-100.png')} style={{ width: 30, height: 30 }} />}
                                                label='Estado'
                                                onChangeText={(value) => setFormRegister({ ...formRegister, address: { ...formRegister.address, state: value } })}
                                                value={formRegister.address.state}
                                        />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                        <Input
                                                containerStyle={{ flex: 1 }}
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-ciudad-100.png')} style={{ width: 30, height: 30 }} />}
                                                label='Ciudad'
                                                onChangeText={(value) => setFormRegister({ ...formRegister, address: { ...formRegister.address, city: value } })}
                                                value={formRegister.address.city}
                                        />
                                        <Input
                                                containerStyle={{ flex: 1 }}
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-compra-entregada-100.png')} style={{ width: 30, height: 30 }} />}
                                                label='Colonia'
                                                onChangeText={(value) => setFormRegister({ ...formRegister, address: { ...formRegister.address, colony: value } })}
                                                value={formRegister.address.colony}
                                        />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                        <Input
                                                containerStyle={{ flex: 1 }}
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-calle-100.png')} style={{ width: 30, height: 30 }} />}
                                                label='Calle'
                                                onChangeText={(value) => setFormRegister({ ...formRegister, address: { ...formRegister.address, street: value } })}
                                                value={formRegister.address.street}
                                        />
                                        <Input
                                                containerStyle={{ flex: 1 }}
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-hashtag-grande-96.png')} style={{ width: 30, height: 30 }} />}
                                                label='Numero'
                                                keyboardType='numeric'
                                                onChangeText={(value) => setFormRegister({ ...formRegister, address: { ...formRegister.address, number: value } })}
                                                value={formRegister.address.number}
                                        />
                                </View>
                        </View>
                        <View style={styles.containerButtonNext}>
                                <Button title='Atras' color='red' containerStyle={{ width: '40%', borderRadius: 20 }} titleStyle={{ fontWeight: 'bold' }} onPress={() => setProgressBar({
                                        ...progressBar,
                                        positionScreen: formRegister.typeUser === 'paciente' ? 0 : 1
                                })} />
                                <Button title='Siguiente' color='#00935E' containerStyle={{ width: '40%', borderRadius: 20 }} titleStyle={{ fontWeight: 'bold' }} onPress={() => setProgressBar({
                                        ...progressBar,
                                        positionScreen: 3
                                })} />
                        </View>
                </>
        )
}

export default Domicile