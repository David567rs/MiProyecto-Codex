import { View, Text, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { Button, Input, Overlay } from '@rneui/themed'
import { GlobalContext } from '../../contexts/globalContext'

const ModalProfession = () => {

        const { onChangeUser, session, loading, updateUser, setActiveModal3, activeModal3 } = useContext(GlobalContext)

        return (
                <Overlay
                        isVisible={activeModal3}
                        onBackdropPress={() => setActiveModal3(false)}
                        overlayStyle={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: 0,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                                width: '100%',
                                padding: 0,
                        }}
                        backdropStyle={{
                                width: '100%',
                                margin: 0,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                >
                        <View style={{ width: '100%', paddingVertical: 20, borderTopRightRadius: 20, bottom: -10, borderTopLeftRadius: 20, justifyContent: 'center', height: '60%', backgroundColor: '#FFF' }}>
                                <ScrollView contentContainerStyle={{ width: '100%' }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', textAlign: 'center' }}>Datos profesionales</Text>
                                        <Input
                                                label="ID del trabajador"
                                                value={session?.idWorker}
                                                style={{ marginBottom: 10 }}
                                                onChangeText={(e) => onChangeUser('idWorker', e)}
                                        />
                                        <Input
                                                label="Profesión"
                                                placeholder="Profesión"
                                                value={session?.profession}
                                                style={{ marginBottom: 10 }}
                                                onChangeText={(e) => onChangeUser('profession', e)}
                                        />
                                        <Input
                                                label="Cedula"
                                                placeholder="Cedula"
                                                value={session?.cedula}
                                                style={{ marginBottom: 10 }}
                                                onChangeText={(e) => onChangeUser('cedula', e)}
                                        />
                                        <Input
                                                label="Instiución"
                                                placeholder="Instiución"
                                                value={session?.institution}
                                                style={{ marginBottom: 10 }}
                                                onChangeText={(e) => onChangeUser('institution', e)}
                                        />
                                        <Input
                                                label="Puesto"
                                                placeholder="Puesto"
                                                value={session?.position}
                                                style={{ marginBottom: 10 }}
                                                onChangeText={(e) => onChangeUser('position', e)}
                                        />
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

export default ModalProfession