import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tab, TabView } from '@rneui/base'
import TabParent from './tabParent'
import TabVaccines from './tabVaccines'

const ParentAndVaccines = ({ route, navigation }) => {

        const [tabSelected, setTabSelected] = useState(0)

        useEffect(() => {
                navigation.setOptions({
                        headerTitle: tabSelected == 0 ? 'Padres' : 'Vacunas',
                })
        }, [tabSelected])

        return (
                <View style={{ flex: 1 }}>
                        <View style={{ width: '100%', alignItems: 'center', paddingVertical: 15 }}>
                                <View style={{ backgroundColor: '#CCC', borderRadius: 30, width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Tab
                                                value={tabSelected}
                                                onChange={(e) => setTabSelected(e)}
                                                dense={true}
                                                titleStyle={{ color: '#FFF' }}
                                                containerStyle={{ borderRadius: 30 }}
                                                indicatorStyle={{ backgroundColor: '#48A2E2', height: '100%', borderRadius: 30, zIndex: -1, width: '50%' }}
                                        >
                                                <Tab.Item title="Padres" color='primary' />
                                                <Tab.Item title="Vacunas" />
                                        </Tab>
                                </View>
                        </View>
                        <View style={{ flex: 1 }}>
                                <TabView value={tabSelected} onChange={setTabSelected} animationType='spring' containerStyle={{ height: 'auto' }}>
                                        <TabParent 
                                                route={route}
                                                navigation={navigation}
                                        />
                                        <TabVaccines
                                                route={route}
                                                navigation={navigation}
                                        />
                                </TabView>
                        </View>
                </View>
        )
}

export default ParentAndVaccines