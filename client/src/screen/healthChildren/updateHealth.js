import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Button, Input ,Overlay} from '@rneui/themed'

const UpdateHealth = ({ activeModal, closeModal, formChildren, setFormChildren, updateChildren }) => {

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
                                                }}>Altura</Text>
                                                <Input
                                                        onChangeText={(value) => setFormChildren({ ...formChildren, height: value })} value={formChildren?.height}
                                                        placeholder='Ej: 50 CM'
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
                                                }}>Peso</Text>
                                                <Input
                                                        onChangeText={(value) => setFormChildren({ ...formChildren, weight: value })} value={formChildren?.weight}
                                                        placeholder='Ej: 4 KG'
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
                                                }}>Circunferencia de la cabeza</Text>
                                                <Input
                                                        onChangeText={(value) => setFormChildren({ ...formChildren, headCircumference: value })}
                                                        value={formChildren?.headCircumference}
                                                        placeholder='Ej: 50 cm'
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
                                                }}>Grupo sanguineo</Text>
                                                <Input
                                                        onChangeText={(value) => setFormChildren({ ...formChildren, bloodType: value })}
                                                        value={formChildren?.bloodType}
                                                        placeholder='Ej: A+'
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
                                                }}>Factor Rh</Text>
                                                <Input
                                                        onChangeText={(value) => setFormChildren({ ...formChildren, rhFactor: value })}
                                                        value={formChildren?.rhFactor}
                                                        placeholder='Ej: +'
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
                                                        onPress={() => updateChildren(2)}
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

export default UpdateHealth