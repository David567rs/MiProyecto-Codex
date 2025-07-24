import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Button, ButtonGroup, Image, SearchBar } from '@rneui/themed'
import useChildren from '../../hooks/useChildren'
import Card from '../children/card'

const ParentsChildren = ({ route, navigation }) => {

        const { getChildren, children } = useChildren()
        const { _id } = route.params.parent

        useEffect(() => {
                getChildren(_id)
        }, [route.params])

        const nameFilter = ['Todo', 'Nombre', 'Edad', 'Estado']

        return (
                <ScrollView>
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
                                                        title='Esquema'
                                                        icon={<Image source={require('../../../assets/icons/icons8-calendario-100.png')} style={{ width: 20, height: 20 }} />}
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
                                                onPress={(value) => navigation.navigate('profilechildren', { children })}       
                                        />
                                </View>
                        </View>
                        <View style={{ width: '100%', gap: 10, padding: 10 }}>
                                {children.length === 0 ? (
                                        <Text>No hay niños</Text>
                                ) : (
                                        children.map((ch) =>
                                                <Card key={ch._id} navigation={navigation} children={ch} />
                                        )
                                )}
                        </View>
                </ScrollView>
        )
}

export default ParentsChildren