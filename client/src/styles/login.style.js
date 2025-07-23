import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  // Contenedor principal para KeyboardAvoidingView + ScrollView
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  // Estilos de pestañas (mantener)
  containerTabs: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    zIndex: 2,
    padding: 10,
    elevation: 2,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
  },
  containerTabView: {
    flex: 1,
    overflow: 'hidden',
  },
  // Título de login
  titleLogin: {
    fontSize: 20,
    marginVertical: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  // Caja principal de login
  boxLogin: {
    flex: 1,
    alignItems: 'center',
  },
  // Icono de usuario
  iconUser: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  // Iconos dentro de los Inputs
  iconInput: {
    width: 30,
    height: 30,
  },
  // Link de recuperación de contraseña
  linkRecovery: {
    width: '100%',
    textAlign: 'right',
    color: '#48A2E2',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  // Botón de submit
  submitButton: {
    width: '80%',
    marginVertical: 20,
    borderRadius: 30,
  },
  submitButtonTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Otros estilos de registro (mantener si los usas)
  boxTitle: {
    alignItems: 'center',
    marginVertical: 20,
    width: '80%',
    alignSelf: 'center',
  },
  titleRegister: {
    fontSize: 20,
    marginVertical: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    color: '#848C8C',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  uploadImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerRadio: {
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  containerButtonNext: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  progressBar: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
  },
  boxPoint: {
    flex: 1,
    alignItems: 'center',
  },
  lineProgress: {
    position: 'absolute',
    width: '70%',
    height: 3,
    backgroundColor: '#48A2E2',
    top: 31,
    left: '15%',
    zIndex: -1,
  },
})
