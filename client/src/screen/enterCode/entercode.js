import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import BackgroundScreen from '../../components/backgroundScreen';
import { Button, Image } from '@rneui/themed';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const Entercode = ({ navigation, route }) => {
    const { email } = route.params;
    const [code, setCode] = useState(['', '', '', '']);

    const handleChangeText = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
    };

    const handleSubmit = async () => {
        const enteredCode = code.join('');
        try {
            const response = await axios.post(`${API_URL}/emails/validate-code`, { email, code: enteredCode });
            if (response.data.success) {
                navigation.navigate('changepassword', { email });
            } else {
                Alert.alert('El código es incorrecto.');
            }
        } catch (error) {
            console.error('Error al validar el código:', error);
            Alert.alert('Error', 'Hubo un problema al validar el código. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <BackgroundScreen>
            <View style={{
                height: '60%', width: '100%',
                marginTop: 20,
                backgroundColor: '#FFF',
                overflow: 'hidden',
                borderRadius: 20,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                zIndex: 2,
                padding: 10,
                elevation: 2,
            }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 100 }}>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 10 }}>Ingresa el código</Text>
                        <Image source={require('../../../assets/icons/LLave.png')} style={{ width: 130, height: 130 }} />
                        <Text numberOfLines={3} style={{ paddingHorizontal: 30, textAlign: 'center', fontSize: 16 }}>
                            Hemos enviado un código al correo que nos proporcionaste, por favor ingresa el código.
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 20, paddingVertical: 20 }}>
                            {code.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    style={{
                                        width: 45,
                                        height: 45,
                                        borderWidth: 2,
                                        borderColor: '#CCC',
                                        textAlign: 'center',
                                        fontSize: 18,
                                    }}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    value={digit}
                                    onChangeText={text => handleChangeText(text, index)}
                                />
                            ))}
                        </View>
                        <Button
                            onPress={handleSubmit}
                            title='Enviar'
                            color='#48A2E2'
                            containerStyle={{ width: '60%', borderRadius: 20 }}
                            titleStyle={{ fontWeight: 'bold' }}
                        />
                    </View>
                </ScrollView>
            </View>
        </BackgroundScreen>
    );
}

export default Entercode;
