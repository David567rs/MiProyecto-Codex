import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import BackgroundScreen from '../../components/backgroundScreen';
import { Button, Image, Input } from '@rneui/themed';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

const ChangePassword = ({ navigation, route }) => {
    const { email } = route.params;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return;
        }
        try {
            const response = await axios.post(`${API_URL}/users/reset-password`, { email, newPassword: password });
            if (response.data.success) {
                Alert.alert('Éxito', 'Contraseña restablecida correctamente.');
                navigation.navigate('login');
            } else {
                Alert.alert('Error', 'No se pudo restablecer la contraseña. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            Alert.alert('Error', 'Ocurrió un error al restablecer la contraseña. Por favor, inténtalo de nuevo.');
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
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center' }}>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 10 }}>Crear una nueva contraseña</Text>
                        <Image source={require('../../../assets/icons/lockHidden.png')} style={{ width: 200, height: 70, marginVertical: 20 }} />
                        <Text numberOfLines={2} style={{ paddingHorizontal: 20, textAlign: 'center', fontSize: 16 }}>Crea una nueva contraseña para
                            poder acceder a tu cuenta</Text>
                        <Input
                            leftIcon={<Image source={require('../../../assets/icons/icons8-candado-100.png')} style={{ width: 30, height: 30 }} />}
                            label='Contraseña'
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        <Input
                            leftIcon={<Image source={require('../../../assets/icons/icons8-candado-100.png')} style={{ width: 30, height: 30 }} />}
                            label='Confirmar contraseña'
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
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
};

export default ChangePassword;
