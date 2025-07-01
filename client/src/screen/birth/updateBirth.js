import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Button, Input, Overlay } from '@rneui/themed'

const UpdateBirth = ({ activeModal, closeModal, formChildren, setFormChildren, updateChildren }) => {

        return (
                <Overlay
                        animationType="slide"
                        transparent={true}
                        visible={activeModal}
                        overlayStyle={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                margin: 0,
                                padding: 0,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                        onRequestClose={() => closeModal()}
                >
                        <ScrollView
                                style={{
                                        position: 'relative',
                                        flex: 1,
                                        width: '100%',
                                }}
                                contentContainerStyle={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: 'auto',
                                        bottom: 0,
                                }}>
                                <View style={{ width: '100%', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 10, borderTopRightRadius: 10, borderTopLeftRadius: 10, gap: 10 }}>
                                        <View>
                                                <Text style={{
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                }}>Fecha de nacimiento</Text>
                                                <Input
                                                        onChangeText={(value) => setFormChildren({ ...formChildren, dateOfBirth: value })} value={formChildren?.dateOfBirth}
                                                        placeholder='Ej: DD/MM/YYYY'
                                                        containerStyle={{
                                                                width: '100%',
                                                                height: 40,
                                                                borderColor: '#CCC',
                                                                borderWidth: 2,
                                                                borderRadius: 10,
                                                        }} inputContainerStyle={{
                                                                borderWidth: 0,
                                                                borderColor: 0
                                                        }}
                                                />
                                        </View>
                                        <View>
                                                <Text style={{
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                }}>CP</Text>
                                                <Input
                                                        onChangeText={(value) => setFormChildren({ ...formChildren, zipCode: value })} value={formChildren?.zipCode}
                                                        containerStyle={{
                                                                width: '100%',
                                                                height: 40,
                                                                borderColor: '#CCC',
                                                                borderWidth: 2,
                                                                borderRadius: 10,
                                                        }} inputContainerStyle={{
                                                                borderWidth: 0,
                                                                borderColor: 0
                                                        }}
                                                />
                                        </View>
                                        <View>
                                                <Text style={{
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                }}>Estado</Text>
                                                <Input
                                                        onChangeText={(value) => setFormChildren({ ...formChildren, state: value })}
                                                        value={formChildren?.state}
                                                        containerStyle={{
                                                                width: '100%',
                                                                height: 40,
                                                                borderColor: '#CCC',
                                                                borderWidth: 2,
                                                                borderRadius: 10,
                                                        }} inputContainerStyle={{
                                                                borderWidth: 0,
                                                                borderColor: 0
                                                        }}
                                                />
                                        </View>
                                        <View>
                                                <Text style={{
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                }}>Ciudad</Text>
                                                <Input
                                                        onChangeText={(value) => setFormChildren({ ...formChildren, city: value })}
                                                        value={formChildren?.city}
                                                        containerStyle={{
                                                                width: '100%',
                                                                height: 40,
                                                                borderColor: '#CCC',
                                                                borderWidth: 2,
                                                                borderRadius: 10,
                                                        }} inputContainerStyle={{
                                                                borderWidth: 0,
                                                                borderColor: 0
                                                        }}
                                                />
                                        </View>
                                        <View>
                                                <Text style={{
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                }}>Colonia</Text>
                                                <Input
                                                        onChangeText={(value) => setFormChildren({ ...formChildren, neighborhood: value })}
                                                        value={formChildren?.neighborhood}
                                                        containerStyle={{
                                                                width: '100%',
                                                                height: 40,
                                                                borderColor: '#CCC',
                                                                borderWidth: 2,
                                                                borderRadius: 10,
                                                        }} inputContainerStyle={{
                                                                borderWidth: 0,
                                                                borderColor: 0
                                                        }}
                                                />
                                        </View>
                                        <View>
                                                <Text style={{
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                }}>Hospital</Text>
                                                <Input
                                                        onChangeText={(value) => setFormChildren({ ...formChildren, hospital: value })}
                                                        value={formChildren?.hospital}
                                                        containerStyle={{
                                                                width: '100%',
                                                                height: 40,
                                                                borderColor: '#CCC',
                                                                borderWidth: 2,
                                                                borderRadius: 10,
                                                        }} inputContainerStyle={{
                                                                borderWidth: 0,
                                                                borderColor: 0
                                                        }}
                                                />
                                        </View>
                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Button
                                                        title='Guardar'
                                                        color='transparent'
                                                        onPress={() => updateChildren(3)}
                                                        containerStyle={{
                                                                width: '50%',
                                                                height: 40,
                                                                borderRadius: 20,
                                                                backgroundColor: '#48A2E2',
                                                                marginTop: 10
                                                        }}
                                                />
                                        </View>
                                </View>
                        </ScrollView>
                </Overlay>
        )
}

export default UpdateBirth