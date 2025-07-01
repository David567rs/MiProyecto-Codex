import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { Button, Input, Overlay } from '@rneui/themed'
import { GlobalContext } from '../../contexts/globalContext'

const ModalPersonalData = ({ activeModal, setActiveModal }) => {

        const { onChangeUser, session, loading, updateUser } = useContext(GlobalContext)

        return (
                <Overlay
                        isVisible={activeModal}
                        onBackdropPress={() => setActiveModal(!activeModal)}
                        overlayStyle={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: 0,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                                width: '100%',
                                height: 'auto',
                                padding: 0,
                        }}
                        backdropStyle={{
                                width: '100%',
                                margin: 0,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                >
                        <View style={{ width: '100%', paddingVertical: 20, borderTopRightRadius: 20, bottom: -10, borderTopLeftRadius: 20, justifyContent: 'center', maxHeight: '60%', backgroundColor: '#FFF' }}>
                                <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', textAlign: 'center' }}>Datos Personales</Text>
                                        <View style={styles.box}>
                                                <Text style={styles.label}>CURP</Text>
                                                <Input onChangeText={(e) => onChangeUser('curp', e)} value={session?.curp} containerStyle={styles.Input} inputContainerStyle={styles.boxInput} />
                                        </View>
                                        <View style={styles.box}>
                                                <Text style={styles.label}>Nombre</Text>
                                                <Input onChangeText={(e) => onChangeUser('name', e)} value={session?.name} containerStyle={styles.Input} inputContainerStyle={styles.boxInput} />
                                        </View>
                                        <View style={styles.box}>
                                                <Text style={styles.label}>Apellido Paterno</Text>
                                                <Input onChangeText={(e) => onChangeUser('lastName', e)} value={session?.lastName} containerStyle={styles.Input} inputContainerStyle={styles.boxInput} />
                                        </View>
                                        <View style={styles.box}>
                                                <Text style={styles.label}>Apellido Materno</Text>
                                                <Input onChangeText={(e) => onChangeUser('motherLastName', e)} value={session?.motherLastName} containerStyle={styles.Input} inputContainerStyle={styles.boxInput} />
                                        </View>
                                        <View style={styles.box}>
                                                <Text style={styles.label}>Correo</Text>
                                                <Input onChangeText={(e) => onChangeUser('email', e)} value={session?.email} containerStyle={styles.Input} inputContainerStyle={styles.boxInput} />
                                        </View>
                                        <View style={styles.box}>
                                                <Text style={styles.label}>Telefono</Text>
                                                <Input onChangeText={(e) => onChangeUser('phone', e)} value={session?.phone} containerStyle={styles.Input} inputContainerStyle={styles.boxInput} />
                                        </View>
                                        <View style={styles.box}>
                                                <Text style={styles.label}>Fecha de Nacimiento</Text>
                                                <Input onChangeText={(e) => onChangeUser('birthDate', e)} value={session?.birthDate} containerStyle={styles.Input} inputContainerStyle={styles.boxInput} />
                                        </View>
                                        <View style={styles.box}>
                                                <Text style={styles.label}>Sexo</Text>
                                                <Input
                                                        value={session?.gender}
                                                        containerStyle={styles.Input} inputContainerStyle={styles.boxInput}
                                                        onChange={(e) => onChange('gender', e)} />
                                        </View>
                                        <View style={styles.box}>
                                                <Text style={styles.label}>Edad</Text>
                                                <Input
                                                        value={session?.year}
                                                        containerStyle={styles.Input} inputContainerStyle={styles.boxInput}
                                                        onChangeText={(e) => onChangeUser('year', e)} />
                                        </View>
                                        <View style={{ width: '100%', alignItems: 'center', padding: 10 }}>
                                                <Button
                                                        onPress={() => updateUser()}
                                                        title={loading ? 'Guardando..' : 'Guardar'} loading={loading} color='#48A2E2' containerStyle={{ width: '60%', borderRadius: 20 }} />
                                        </View>
                                </ScrollView>
                        </View>
                </Overlay>
        )
}

const styles = StyleSheet.create({
        containerInput: {
                flex: 1,
        },
        label: {
                fontSize: 16,
                fontWeight: 'bold',
        },
        box: {
                flex: 1,
                width: '95%',
                height: 'auto',
                marginVertical: 15,
        },
        Input: {
                width: '100%',
                height: 40,
                borderColor: '#CCC',
                borderWidth: 2,
                borderRadius: 10,
        },
        boxInput: {
                borderWidth: 0,
                borderColor: 0,
        },

})

export default ModalPersonalData