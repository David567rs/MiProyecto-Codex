import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Overlay } from '@rneui/base'
import { Button, Input } from '@rneui/themed'

const UpdatePersonalInfo = ({ activeModal, closeModal, formChildren, setFormChildren, updateChildren }) => {

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
                                                }}>Curp</Text>
                                                <Input
                                                        onChangeText={(value) => setFormChildren({ ...formChildren, curp: value })} value={formChildren.curp}
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
                                                }}>Nombres</Text>
                                                <Input
                                                        onChangeText={(value) => setFormChildren({ ...formChildren, name: value })} value={formChildren.name}
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
                                                }}>Apellido Paterno</Text>
                                                <Input
                                                        onChangeText={(value) => setFormChildren({ ...formChildren, lastName: value })}
                                                        value={formChildren.lastName}
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
                                                }}>Apellido Materno</Text>
                                                <Input
                                                        onChangeText={(value) => setFormChildren({ ...formChildren, secondLastName: value })}
                                                        value={formChildren.secondLastName}
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
                                                }}>Sexo</Text>
                                                <Input
                                                        onChangeText={(value) => setFormChildren({ ...formChildren, gender: value })}
                                                        value={formChildren.gender}
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
                                                }}>Edad</Text>
                                                <Input
                                                        keyboardType='number-pad'
                                                        onChangeText={(value) => setFormChildren({ ...formChildren, age: value })}
                                                        value={formChildren.age}
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
                                                        onPress={() => updateChildren(1)}
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

export default UpdatePersonalInfo