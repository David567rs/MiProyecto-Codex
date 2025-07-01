import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../styles/login.style'
import { Button, Image, Input } from '@rneui/themed'

const WorkerData = ({ formRegister, setFormRegister, setProgressBar, progressBar }) => {

        return (
                <>
                        <View style={styles.boxTitle}>
                                <Text style={{
                                        fontSize: 20,
                                        color: '#000000',
                                        fontWeight: 'bold'
                                }}>Datos Profesionales</Text>
                        </View>
                        <View>
                                <View style={{ flexDirection: 'row' }}>
                                        <Input
                                                containerStyle={{ flex: 1 }}
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-código-postal-100.png')} style={{ width: 30, height: 30 }} />}
                                                label='Profesion'
                                                onChangeText={(value) => setFormRegister({ ...formRegister, profession: value })}
                                                value={formRegister.profession}
                                        />
                                        <Input
                                                containerStyle={{ flex: 1 }}
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-ayuntamiento-de-los-angeles-100.png')} style={{ width: 30, height: 30 }} />}
                                                label='Cedula'
                                                onChangeText={(value) => setFormRegister({ ...formRegister, celula: value })}
                                                value={formRegister.celula}
                                        />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                        <Input
                                                containerStyle={{ flex: 1 }}
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-ciudad-100.png')} style={{ width: 30, height: 30 }} />}
                                                label='Institucion'
                                                onChangeText={(value) => setFormRegister({ ...formRegister, institution: value })}
                                                value={formRegister.institution}
                                        />
                                        <Input
                                                containerStyle={{ flex: 1 }}
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-compra-entregada-100.png')} style={{ width: 30, height: 30 }} />}
                                                label='Puesto'
                                                onChangeText={(value) => setFormRegister({ ...formRegister, position: value })}
                                                value={formRegister.position}
                                        />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                        <Input
                                                containerStyle={{ flex: 1 }}
                                                leftIcon={<Image source={require('../../../assets/icons/icons8-hashtag-grande-96.png')} style={{ width: 30, height: 30 }} />}
                                                label='ID de trabajador'
                                                onChangeText={(value) => setFormRegister({ ...formRegister, idWorker: value })}
                                                value={formRegister.idWorker}
                                        />
                                </View>
                        </View>
                        <View style={styles.containerButtonNext}>
                                <Button title='Atras' color='red' containerStyle={{ width: '40%', borderRadius: 20 }} titleStyle={{ fontWeight: 'bold' }} onPress={() => setProgressBar({
                                        ...progressBar,
                                        positionScreen: 0
                                })} />
                                <Button title='Siguiente' color='#00935E' containerStyle={{ width: '40%', borderRadius: 20 }} titleStyle={{ fontWeight: 'bold' }} onPress={() => setProgressBar({
                                        ...progressBar,
                                        positionScreen: 2
                                })} />
                        </View>
                </>
        )
}

export default WorkerData