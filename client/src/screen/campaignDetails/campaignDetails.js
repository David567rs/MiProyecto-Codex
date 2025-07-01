import { View, Text, Dimensions, ScrollView ,StyleSheet} from 'react-native';
import React, { useState } from 'react';
import { NoImgVaccineIcon } from '../../icons/iconsSvg';
import { Button, Icon, Image } from '@rneui/themed';

const { width } = Dimensions.get('screen');

const CampaignDetails = ({ route, navigation }) => {
        if (!route.params?.campaign) {
                return (
                        <View style={{ width: '100%', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, marginVertical: 20 }}>
                                        Hubo un error al buscar esta campaña
                                </Text>
                        </View>
                );
        }

        const { name, description, images, state, city, colony, date, startdate, hour, vaccines, sideeffects, age } = route.params.campaign;

        const lugar = `${state}, ${city}, ${colony}`;

        const [itemSelected, setItemSelected] = useState({ name: '', image: require('../../../assets/icons/icons8-calendario-100.png'), item: date });

        const handleItemSelected = (item, name, image) => {
                setItemSelected({ item, name, image });
        };


        return (
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingBottom: 80 }}>
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', aspectRatio: 1 }}>
                                {images?.length === 0 ? (
                                        <NoImgVaccineIcon size={150} />
                                ) : (
                                        <Image source={{ uri: images[0] }} style={{ width: width, height: '100%' }} />
                                )}
                        </View>
                        <View style={{ width: '100%', padding: 10, justifyContent: 'center', alignItems: 'flex-start' }}>
                                <View style={{
                                        width: '100%',
                                        gap: 10,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                                width: 0,
                                                height: 2,
                                        },
                                        shadowOpacity: 0.23,
                                        shadowRadius: 2.62,
                                        elevation: 4,
                                        borderRadius: 10,
                                        paddingVertical: 10,
                                        backgroundColor: '#FFFFFF',
                                        paddingHorizontal: 10,
                                }}>
                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View style={{ flexDirection: 'row', gap: 5 }}>
                                                        <Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>{name}</Text>
                                                        <Image source={require('../../../assets/icons/icons8-de-acuerdo-96.png')} style={{ width: 30, height: 30 }} />
                                                </View>
                                        </View>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Descripción</Text>
                                        <Text style={styles.justifiedText}>{description}</Text>
                                        <View style={{ width: '100%', paddingVertical: 10 }}>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingVertical: 10 }}>Información adicional</Text>
                                                <View style={{ flexDirection: 'row', gap: 20, marginBottom: 30 }}>
                                                        <View style={{ flex: 1, alignItems: 'center', gap: 5 }}>
                                                                <Image source={require('../../../assets/icons/icons8-calendario-100.png')} style={{ width: 40, height: 40 }} />
                                                                <Button
                                                                        onPress={() => handleItemSelected(startdate, 'Fecha', require('../../../assets/icons/icons8-calendario-100.png'))}
                                                                        title='Fecha' icon={<Icon name='plus' type='feather' size={18} color='#48A2E2' />}
                                                                        size='sm' color='#FFFFFF' iconPosition='right'
                                                                        containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#48A2E2' }}
                                                                        titleStyle={{ color: '#48A2E2', fontSize: 14 }}
                                                                />
                                                        </View>
                                                        <View style={{ flex: 1, alignItems: 'center', gap: 5 }}>
                                                                <Image source={require('../../../assets/icons/icons8-alarma-en-80.png')} style={{ width: 40, height: 40 }} />
                                                                <Button
                                                                        onPress={() => handleItemSelected(hour, 'Horario', require('../../../assets/icons/icons8-alarma-en-80.png'))}
                                                                        title='Horario' icon={<Icon name='plus' type='feather' size={18} color='#48A2E2' />}
                                                                        size='sm' color='#FFFFFF' iconPosition='right'
                                                                        containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#48A2E2' }}
                                                                        titleStyle={{ color: '#48A2E2', fontSize: 14 }}
                                                                />
                                                        </View>
                                                        <View style={{ flex: 1, alignItems: 'center', gap: 5 }}>
                                                                <Image source={require('../../../assets/icons/icons8-marca-o-100.png')} style={{ width: 40, height: 40 }} />
                                                                <Button
                                                                        onPress={() => handleItemSelected(lugar, 'Lugar', require('../../../assets/icons/icons8-marca-o-100.png'))}
                                                                        title='Lugar' icon={<Icon name='plus' type='feather' size={18} color='#48A2E2' />}
                                                                        size='sm' color='#FFFFFF' iconPosition='right'
                                                                        containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#48A2E2' }}
                                                                        titleStyle={{ color: '#48A2E2', fontSize: 14 }}
                                                                />
                                                        </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', gap: 20 }}>
                                                        <View style={{ flex: 1, alignItems: 'center', gap: 5 }}>
                                                                <Image source={require('../../../assets/icons/icons8-jeringa-64(1).png')} style={{ width: 40, height: 40 }} />
                                                                <Button
                                                                        onPress={() => handleItemSelected(vaccines, 'Vacunas', require('../../../assets/icons/icons8-jeringa-64(1).png'))}
                                                                        title='Vacunas' icon={<Icon name='plus' type='feather' size={18} color='#48A2E2' />}
                                                                        size='sm' color='#FFFFFF' iconPosition='right'
                                                                        containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#48A2E2' }}
                                                                        titleStyle={{ color: '#48A2E2', fontSize: 14 }}
                                                                />
                                                        </View>
                                                        <View style={{ flex: 1, alignItems: 'center', gap: 5 }}>
                                                                <Image source={require('../../../assets/icons/icons8-enfermedad-100.png')} style={{ width: 40, height: 40 }} />
                                                                <Button
                                                                        onPress={() => handleItemSelected(sideeffects, 'Efectos secundarios', require('../../../assets/icons/icons8-enfermedad-100.png'))}
                                                                        title='Efectos secundarios' icon={<Icon name='plus' type='feather' size={18} color='#48A2E2' />}
                                                                        size='sm' color='#FFFFFF' iconPosition='right'
                                                                        containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#48A2E2' }}
                                                                        titleStyle={{ color: '#48A2E2', fontSize: 14 }}
                                                                />
                                                        </View>
                                                        <View style={{ flex: 1, alignItems: 'center', gap: 5 }}>
                                                                <Image source={require('../../../assets/icons/icons8-familia-hombre-mujer-100.png')} style={{ width: 40, height: 40 }} />
                                                                <Button
                                                                        onPress={() => handleItemSelected(age, 'Edad', require('../../../assets/icons/icons8-familia-hombre-mujer-100.png'))}
                                                                        title='Edad' icon={<Icon name='plus' type='feather' size={18} color='#48A2E2' />}
                                                                        size='sm' color='#FFFFFF' iconPosition='right'
                                                                        containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#48A2E2' }}
                                                                        titleStyle={{ color: '#48A2E2', fontSize: 14 }}
                                                                />
                                                        </View>
                                                </View>
                                        </View>
                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{itemSelected?.name}</Text>
                                                <Image source={itemSelected?.image} style={{ width: 40, height: 40, marginVertical: 10 }} />
                                                <View style={{ width: '100%', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                        {Array.isArray(itemSelected.item) ? (
                                                                itemSelected.item.length > 0 ? (
                                                                        itemSelected.item.map((i, index) => (
                                                                                <Button
                                                                                        key={index}
                                                                                        title={i}
                                                                                        containerStyle={{ width: '50%', borderWidth: 1, borderRadius: 10, borderColor: '#48A2E2' }}
                                                                                        titleStyle={{ color: '#48A2E2' }}
                                                                                        color='transparent'
                                                                                />
                                                                        ))
                                                                ) : (
                                                                        <Text>Sin {itemSelected.name}</Text>
                                                                )
                                                        ) : (
                                                                <Button
                                                                        title={itemSelected.item}
                                                                        containerStyle={{ width: '100%', borderWidth: 1, borderRadius: 10, borderColor: '#48A2E2' }}
                                                                        titleStyle={{ color: '#48A2E2' }}
                                                                        color='transparent'
                                                                />
                                                        )}
                                                </View>
                                        </View>
                                </View>
                        </View>
                </ScrollView>
        );
};
const styles = StyleSheet.create({
        justifiedText: {
            fontSize: 15,
            textAlign: 'justify',
        },
    });

export default CampaignDetails;
