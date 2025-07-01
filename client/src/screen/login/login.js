import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../styles/login.style'
import BackgroundScreen from '../../components/backgroundScreen'
import { Tab, TabView } from '@rneui/themed'
import TabLogin from './tabLogin'
import TabRegister from './tabRegister'

const Login = ({ route, navigation }) => {

        const [tabSelected, setTabSelected] = useState(0)

        return (
                <BackgroundScreen>
                        <View style={[{ height: '65%' }, styles.containerTabs]}>
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                        <View style={{ backgroundColor: '#CCC', borderRadius: 30, width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                                                <Tab
                                                        value={tabSelected}
                                                        onChange={(e) => setTabSelected(e)}
                                                        dense={true}
                                                        titleStyle={{ color: '#FFF' }}
                                                        containerStyle={{ borderRadius: 30 }}
                                                        indicatorStyle={{ backgroundColor: '#48A2E2', height: '100%', borderRadius: 30, zIndex: -1, width: '50%' }}>
                                                        <Tab.Item title="Iniciar Sesión" color='primary' />
                                                        <Tab.Item title="Registrarme" />
                                                </Tab>
                                        </View>
                                </View>
                                <View style={styles.containerTabView}>
                                        <TabView value={tabSelected} onChange={setTabSelected} animationType='spring'>
                                                <TabLogin
                                                        tabSelected={tabSelected}
                                                        navigation={navigation} />
                                                <TabRegister
                                                        tabSelected={tabSelected}
                                                        setTabSelected={setTabSelected}
                                                        navigation={navigation}
                                                />
                                        </TabView>
                                </View>
                        </View>
                </BackgroundScreen>
        )
}

export default Login