import { View, Text, ScrollView, FlatList, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Icon } from '@rneui/themed';
import { GlobalContext } from '../../contexts/globalContext';
import useMonth from '../../hooks/useMonth';
import ItemVaccinePublic from '../parentAndVaccines/itemVaccinePublic';

const VaccinesPublic = ({ route, navigation }) => {
    const [buttonSelected, setButtonSelected] = useState(0);
    const { session } = useContext(GlobalContext);
    const { month, getAllMonths } = useMonth();
    const [filteredMonth, setFilteredMonth] = useState([]);

    useEffect(() => {
        getAllMonths();
        navigation.setOptions({
            headerTitle: 'Vacunas',
            headerLeft: () => (
                <Button
                    color='transparent'
                    icon={
                        <Icon
                            type='ionicons'
                            name='arrow-back'
                            size={30}
                            color='#FFFFFF'
                        />
                    }
                    onPress={() => navigation.navigate(session?.typeUser === 'trabajador' ? 'parentandvaccines' : 'children')}
                />
            ),
        });
    }, [navigation, session?.typeUser]);

    useEffect(() => {
        const monthsWithVaccines = month.filter(item => item.vaccines && item.vaccines.length > 0);
        const sortedMonths = monthsWithVaccines.sort((a, b) => a.month - b.month);
        const filterByRange = (months, range) => {
            switch (range) {
                case 0: 
                    return months.filter(item => item.month >= 0 && item.month <= 6);
                case 1:
                    return months.filter(item => item.month >= 7 && item.month <= 24);
                case 2:
                    return months.filter(item => item.month >= 25 && item.month <= 72);
                case 3:
                    return months;
                default:
                    return months;
            }
        };

        setFilteredMonth(filterByRange(sortedMonths, buttonSelected));
    }, [month, buttonSelected]);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 100 }}>
            <View style={{ width: '100%' }}>
                <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
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
                <View style={{ width: '100%' }}>
                    <ScrollView horizontal={true} style={{ width: '100%', marginTop: 10 }}>
                        <ButtonGroup
                            buttons={['0-6', '7-24', '36-72', 'Completo']}
                            selectedIndex={buttonSelected}
                            onPress={(value) => setButtonSelected(value)}
                            innerBorderStyle={{ width: 0 }}
                            selectedButtonStyle={{ backgroundColor: '#48A2E2' }}
                            style={{ width: '100%', borderRadius: 30, backgroundColor: '#CCC', marginTop: 10 }}
                            buttonStyle={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: '#48A2E2', borderRadius: 10, width: 70 }}
                            textStyle={{ color: '#48A2E2', fontWeight: 'bold' }}
                            containerStyle={{ marginBottom: 20, gap: 10, width: '100%', backgroundColor: 'transparent', borderWidth: 0, paddingRight: 20 }}
                        />
                    </ScrollView>
                </View>
                <View style={{ flex: 1, width: '100%', gap: 20 }}>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            scrollEnabled={false}
                            horizontal={false}
                            data={filteredMonth}
                            renderItem={({ item }) => <ItemVaccinePublic m={item} />}
                            keyExtractor={item => item._id.toString()}
                            numColumns={2}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default React.memo(VaccinesPublic);
