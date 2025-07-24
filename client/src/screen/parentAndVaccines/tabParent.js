import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, ButtonGroup, SearchBar, TabView } from '@rneui/base'
import useParent from '../../hooks/useParent'

const TabParent = ({ route, navigation }) => {

        const { getParents, parents, loading } = useParent()

        useEffect(() => {
                getParents()
        }, [])

        if (loading) {
                return (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size='large' color='#000' />
                        </View>
                )
        }

        const nameFilter = ['Todo', 'Nombre', 'Hijos', 'Completo']

        const tabBarHeight = useBottomTabBarHeight()
        const { bottom } = useSafeAreaInsets()

        return (
                <TabView.Item style={{ width: '100%' }}>
                        <ScrollView
                                keyboardDismissMode='interactive'
                                contentContainerStyle={{ paddingBottom: tabBarHeight + bottom }}
                        >
                                <View style={{ width: '100%', padding: 10 }}>
                                        <SearchBar
                                                placeholder='Buscar'
                                                //onChangeText={(value) => setSearch(value)}
                                                //value={search}
                                                //onSubmitEditing={() => searchProducts(search)}
                                                containerStyle={{
                                                        backgroundColor: 'transparent',
                                                        borderWidth: 1,
                                                        borderColor: 'transparent',
                                                        padding: 2
                                                }}
                                                inputContainerStyle={{
                                                        backgroundColor: '#FFF',
                                                        padding: 0,
                                                        margin: 0,
                                                        borderRadius: 30,
                                                }}
                                                inputStyle={{
                                                        backgroundColor: 'transparent',
                                                        color: '#000',
                                                        padding: 0,
                                                        margin: 0,
                                                        fontSize: 14
                                                }}
                                        />
                                        <View style={{ width: '100%' }}>
                                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Button
                                                                icon={<Image source={require('../../../assets/icons/icons8-filtro-relleno-100.png')} style={{ width: 20, height: 20 }} />}
                                                                title='Filtros'
                                                                color='transparent'
                                                                containerStyle={{ borderRadius: 30 }}
                                                                titleStyle={{ color: '#48A2E2', fontWeight: 'bold' }}
                                                        />
                                                        <Button
                                                                title='Ordenar'
                                                                icon={<Image source={require('../../../assets/icons/icons8-ordenar-96.png')} style={{ width: 20, height: 20 }} />}
                                                                color='transparent'
                                                                containerStyle={{ borderRadius: 30 }}
                                                                titleStyle={{ color: '#48A2E2', fontWeight: 'bold' }}
                                                        />
                                                </View>
                                        </View>
                                        <View>
                                                <ButtonGroup
                                                        buttons={nameFilter}
                                                        innerBorderStyle={{ width: 0 }}
                                                        selectedButtonStyle={{ backgroundColor: '#48A2E2' }}
                                                        style={{ width: '100%', borderRadius: 30, backgroundColor: '#CCC', marginTop: 10 }}
                                                        buttonStyle={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: '#48A2E2', borderRadius: 10 }}
                                                        textStyle={{ color: '#48A2E2' }}
                                                        containerStyle={{ marginBottom: 20, gap: 10, backgroundColor: 'transparent', borderWidth: 0 }}
                                                        selectedIndex={0}
                                                        onPress={(value) => console.log(value)}
                                                />
                                        </View>
                                </View>
                                <View style={{ width: '100%', paddingHorizontal: 10, gap: 10 }}>
                                        {parents.length === 0 ? (
                                                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>No hay padres</Text>
                                        ) : (
                                                parents.map((parent, index) => (
                                                        <TouchableOpacity
                                                                activeOpacity={0.9}
                                                                key={parent._id}
                                                                onPress={() => navigation.navigate('parentschildren', { parent })}
                                                        >
                                                                <View
                                                                        style={{
                                                                                width: '100%',
                                                                                flexDirection: 'row',
                                                                                backgroundColor: '#FFFFFF',
                                                                                shadowColor: "#000",
                                                                                shadowOffset: {
                                                                                        width: 0,
                                                                                        height: 2,
                                                                                },
                                                                                shadowOpacity: 0.23,
                                                                                shadowRadius: 2.62,
                                                                                elevation: 4,
                                                                                borderRadius: 10,
                                                                                padding: 10,
                                                                                backgroundColor: '#FFFFFF',
                                                                        }}>
                                                                        <View style={{ flex: 1, aspectRatio: 1 / 1, alignItems: 'center', justifyContent: 'center' }}>
                                                                                <Text>Sin Imagen</Text>
                                                                        </View>
                                                                        <View style={{ flex: 2, gap: 5 }}>
                                                                                <Text style={{ fontWeight: 'bold' }}>{parent.name} {parent.lastName} {parent.motherLastName}</Text>
                                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                                        <View style={{ flex: 1, gap: 5 }}>
                                                                                                <View style={{ flexDirection: 'row' }}>
                                                                                                        <Text style={{ fontWeight: 'bold' }}>Hijos: </Text>
                                                                                                        <Text style={{ fontWeight: 'bold', color: '#48A2E2' }}>{parent.childrenCount}</Text>
                                                                                                </View>
                                                                                                <View style={{ flexDirection: 'row' }}>
                                                                                                        <Text style={{ fontWeight: 'bold' }}>Estado: </Text>
                                                                                                        <Text style={{ fontWeight: 'bold', color: '#48A2E2' }}>{parent?.address?.state}</Text>
                                                                                                </View>
                                                                                                <View style={{ flexDirection: 'row' }}>
                                                                                                        <Text style={{ fontWeight: 'bold' }}>Municipio: </Text>
                                                                                                        <Text style={{ fontWeight: 'bold', color: '#48A2E2' }}>{parent?.address?.city}</Text>
                                                                                                </View>
                                                                                        </View>
                                                                                        <View style={{ width: 40 }}>
                                                                                                <Image source={require('../../../assets/icons/icons8-de-acuerdo-96.png')} style={{ width: 30, height: 30 }} />
                                                                                        </View>
                                                                                </View>
                                                                                <View style={{ flexDirection: 'row' }}>
                                                                                        <Text style={{ fontWeight: 'bold' }}>Colonia: </Text>
                                                                                        <Text style={{ fontWeight: 'bold', color: '#48A2E2' }}>{parent?.address?.colony}</Text>
                                                                                </View>
                                                                        </View>
                                                                </View>
                                                        </TouchableOpacity>
                                                ))

                                        )}
                                </View>
                        </ScrollView>
                </TabView.Item >
        )
}

export default TabParent