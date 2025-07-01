import { View, Text } from 'react-native'
import React, { useState } from 'react'
import BackgroundScreen from '../../components/backgroundScreen'
import { Tab, TabView } from '@rneui/themed'
import TabEmail from './tabEmail'
import TabPhone from './tabPhone'

const Recovery = ({ route, navigation }) => {

        const [tabSelected, setTabSelected] = useState(0)

        return (
                <BackgroundScreen>
                        <View style={{
                                height: '60%', width: '100%',
                                marginTop: 20,
                                //height: '75%', //esto debe ser dinamico
                                backgroundColor: '#FFF',
                                overflow: 'hidden',
                                borderRadius: 20,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                                zIndex: 2,
                                padding: 10,
                                elevation: 2,
                        }}>
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                        <View style={{ backgroundColor: '#CCC', borderRadius: 30, width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                                                <Tab
                                                        value={tabSelected}
                                                        onChange={(e) => setTabSelected(e)}
                                                        dense={true}
                                                        titleStyle={{ color: '#FFF' }}
                                                        containerStyle={{ borderRadius: 30 }}
                                                        indicatorStyle={{ backgroundColor: '#48A2E2', height: '100%', borderRadius: 30, zIndex: -1, width: '50%' }}
                                                >
                                                        <Tab.Item title="Correo" color='primary' />
                                                        <Tab.Item title="Telefono" />
                                                </Tab>
                                        </View>
                                </View>
                                <View style={{
                                        flex: 1,
                                        overflow: 'hidden',
                                }}>
                                        <TabView value={tabSelected} onChange={setTabSelected} animationType='spring'>
                                                <TabEmail navigation={navigation} />
                                                <TabPhone navigation={navigation} />
                                        </TabView>
                                </View>
                        </View>
                </BackgroundScreen>
        )
}

export default Recovery