import { View, Text, Platform, KeyboardAvoidingView, ScrollView, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Button, Input, Icon } from '@rneui/themed'
import { Link } from '@react-navigation/native'
import { styles } from '../../styles/login.style'
import { GlobalContext } from '../../contexts/globalContext'

const TabLogin = ({ navigation }) => {
  const { onSubmitLogin, formLogin, setFormLogin, loading } = useContext(GlobalContext)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          color='transparent'
          icon={<Icon type='ionicons' name='arrow-back' size={30} color='#FFFFFF' />}
          onPress={() => navigation.navigate('profilechildren')}
        />
      ),
    })
  }, [navigation])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 200}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.boxLogin}>
          <Text style={styles.titleLogin}>Iniciar Sesión</Text>
          <Image
            source={require('../../../assets/icons/user.png')}
            style={styles.iconUser}
          />

          <Input
            containerStyle={styles.inputContainer}
            label='Correo'
            leftIcon={<Image source={require('../../../assets/icons/icons8-correo-100.png')} style={styles.iconInput} />}
            onChangeText={e => setFormLogin({ ...formLogin, email: e })}
            autoCapitalize='none'
            keyboardType='email-address'
          />

          <Input
            containerStyle={styles.inputContainer}
            label='Contraseña'
            leftIcon={<Image source={require('../../../assets/icons/icons8-candado-100.png')} style={styles.iconInput} />}
            secureTextEntry
            onChangeText={e => setFormLogin({ ...formLogin, password: e })}
          />

          <Link to={{ screen: 'recovery' }} style={styles.linkRecovery}>
            Olvidé mi contraseña
          </Link>

          <Button
            title={loading ? 'Iniciando...' : 'Acceder'}
            color='#48A2E2'
            containerStyle={styles.submitButton}
            loading={loading}
            disabled={loading}
            titleStyle={styles.submitButtonTitle}
            onPress={() => onSubmitLogin(navigation)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default TabLogin
