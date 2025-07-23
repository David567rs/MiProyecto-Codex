import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Image, SearchBar } from '@rneui/themed';
import Card from './card';
import useChildren from '../../hooks/useChildren';
import { GlobalContext } from '../../contexts/globalContext';

const Children = ({ route, navigation }) => {
    const { session } = useContext(GlobalContext);
    const { children, getChildren, loading } = useChildren();

    const [searchText, setSearchText] = useState('');
    const [filteredChildren, setFilteredChildren] = useState([]);
    const [buttonSelected, setButtonSelected] = useState(0);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (session) {
                getChildren(session?._id);
            }
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (searchText) {+
            filterChildren();
        } else {
            applyFilter(buttonSelected);
        }
    }, [searchText, children, buttonSelected]);

    const filterChildren = () => {
        const filtered = children.filter(child =>
            child.name.toLowerCase().includes(searchText.toLowerCase()) ||
            child.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
            child.secondLastName.toLowerCase().includes(searchText.toLowerCase())
        );
        applyFilter(buttonSelected, filtered);
    };

    const applyFilter = (selectedIndex, list = children) => {
        let filtered = list;

        switch (selectedIndex) {
            case 1: 
                filtered = list.filter(child =>
                    child.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    child.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
                    child.secondLastName.toLowerCase().includes(searchText.toLowerCase())
                );
                break;
            case 2: 
                filtered = list.filter(child => child.age && child.age >= 0);
                break;
            default: 
                filtered = list;
        }

        setFilteredChildren(filtered);
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 100 }}>
            <SearchBar
                placeholder="Buscar"
                containerStyle={{ width: '100%', backgroundColor: 'transparent', borderWidth: 0 }}
                inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
                inputStyle={{ backgroundColor: 'white', borderRadius: 10 }}
                searchIcon={{ size: 24, color: 'black' }}
                clearIcon={{ size: 24, color: 'black' }}
                lightTheme
                round
                placeholderTextColor="black"
                value={searchText}
                onChangeText={setSearchText}
            />
            <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button
                    icon={<Image source={require('../../../assets/icons/icons8-filtro-relleno-100.png')} style={{ width: 25, height: 25 }} />}
                    title='Filtros'
                    color='transparent'
                    titleStyle={{ color: '#48A2E2', fontWeight: 'bold', fontSize: 18 }}
                />
                <Button
                    title='Esquema'
                    color='transparent'
                    icon={<Image source={require('../../../assets/icons/icons8-calendario-100.png')} style={{ width: 25, height: 25 }} />}
                    titleStyle={{ color: '#48A2E2', fontWeight: 'bold', fontSize: 18 }}
                />
            </View>
            <View style={{ width: '100%' }}>
                <ButtonGroup
                    buttons={['Todo', 'Nombre', 'Edad','Estado']}
                    selectedIndex={buttonSelected}
                    onPress={(value) => {
                        setButtonSelected(value);
                        applyFilter(value);
                    }}
                    innerBorderStyle={{ width: 0 }}
                    selectedButtonStyle={{ backgroundColor: '#48A2E2' }}
                    style={{ width: '100%', borderRadius: 30, backgroundColor: '#CCC', marginTop: 10 }}
                    buttonStyle={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: '#48A2E2', borderRadius: 10 }}
                    textStyle={{ color: '#48A2E2' }}
                    containerStyle={{ marginBottom: 20, gap: 10, backgroundColor: 'transparent', borderWidth: 0 }}
                />
            </View>
            <View style={{ width: '100%', gap: 10 }}>
                {loading ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size='large' color='#000' />
                    </View>
                ) : (
                    filteredChildren.length > 0 ? (
                        filteredChildren.map(child => <Card key={child._id} children={child} navigation={navigation} />)
                    ) : (
                        <View style={{ width: '100%', height: 200, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>No hay hijos registrados</Text>
                        </View>
                    )
                )}
            </View>
            <View>
                <Button
                    onPress={() => navigation.navigate('addchildren')}
                    title='Agregar hijo'
                    color='transparent'
                    containerStyle={{ backgroundColor: '#48A2E2', borderRadius: 20, paddingHorizontal: 20 }}
                />
            </View>
        </ScrollView>
    );
};

export default Children;

