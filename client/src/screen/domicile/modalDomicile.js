import { View, Text, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { GlobalContext } from '../../contexts/globalContext'
import { Button, Overlay } from '@rneui/themed'
import { Input } from '@rneui/base'

const ModalDomicile = () => {

        const { onChangeUser, session, loading, updateUser, setActiveModal2, activeModal2 } = useContext(GlobalContext)
        
        return (
                <Overlay
                        isVisible={activeModal2}
                        onBackdropPress={() => setActiveModal2(false)}
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
                        <View style={{ width: '100%', paddingVertical: 20, borderTopRightRadius: 20, bottom: -10, borderTopLeftRadius: 20, justifyContent: 'center', maxHeight: '60%', backgroundColor: '#FFF' }}>
                                <ScrollView contentContainerStyle={{ width: '100%' }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', textAlign: 'center' }}>Domicilio</Text>
                                        <Input
                                                label="CP"
                                                placeholder="CP"
                                                value={session?.address?.cp}
                                                style={{ marginBottom: 10 }}
                                                onChangeText={(e) => onChangeUser('address.cp', e)}
                                        />
                                        <Input
                                                label="Estado"
                                                placeholder="Estado"
                                                value={session?.address?.state}
                                                style={{ marginBottom: 10 }}
                                                onChangeText={(e) => onChangeUser('address.state', e)}
                                        />
                                        <Input
                                                label="Ciudad"
                                                placeholder="Ciudad"
                                                value={session?.address?.city}
                                                style={{ marginBottom: 10 }}
                                                onChangeText={(e) => onChangeUser('address.city', e)}
                                        />
                                        <Input
                                                label="Colonia"
                                                placeholder="Colonia"
                                                value={session?.address?.colony}
                                                style={{ marginBottom: 10 }}
                                                onChangeText={(e) => onChangeUser('address.colony', e)}
                                        />
                                        <Input
                                                label="Calle"
                                                placeholder="Calle"
                                                value={session?.address?.street}
                                                style={{ marginBottom: 10 }}
                                                onChangeText={(e) => onChangeUser('address.street', e)}
                                        />
                                        <Input
                                                label="Numero"
                                                placeholder="Numero"
                                                value={session?.address?.number}
                                                style={{ marginBottom: 10 }}
                                                onChangeText={(e) => onChangeUser('address.number', e)}
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

export default ModalDomicile