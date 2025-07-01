import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { Button, ButtonGroup, Icon } from '@rneui/base';
import Card from './card';
import { GlobalContext } from '../../contexts/globalContext';
import useCampaign from '../../hooks/useCampaign';

const Campaigns = ({ route, navigation }) => {

        const { session } = useContext(GlobalContext)
        const { getAllCampaigns, getCampaigns, loading, deleteCampaign } = useCampaign()
        const [buttonSelected, setButtonSelected] = useState(0)

        useEffect(() => {
                getAllCampaigns()
        }, [navigation])

        if (loading) {
                return (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size='large' color='#000' />
                        </View>
                )
        }
        return (
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 80 }}>
                        <View style={{ width: '100%' }}>
                                {session?.typeUser == 'trabajador' && route?.name == 'campaigns' && (
                                        <View style={{ width: '100%', alignItems: 'center' }}>
                                                <Button
                                                        title='Agregar'
                                                        iconPosition='right'
                                                        icon={<Icon name='add' color='white' />}
                                                        containerStyle={{ borderRadius: 20, width: '50%' }}
                                                        onPress={() => navigation.navigate('addcampaign')}
                                                />
                                        </View>
                                )}
                                <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Button title='Filtros' icon={<Icon name='' />} color='transparent' titleStyle={{ fontSize: 18, fontWeight: 'bold', color: '#48A2E2' }} />
                                        <Button title='Ordenar' icon={<Icon name='' />} color='transparent' titleStyle={{ fontSize: 18, fontWeight: 'bold', color: '#48A2E2' }} />
                                </View>
                                <View style={{ width: '100%' }}>
                                        <ButtonGroup
                                                buttons={['Todo', 'Nombre', 'Fecha', 'Creado']}
                                                selectedIndex={buttonSelected}
                                                onPress={(value) => {
                                                        setButtonSelected(value);
                                                }}
                                                innerBorderStyle={{ width: 0 }}
                                                selectedButtonStyle={{ backgroundColor: '#48A2E2' }}
                                                style={{ width: '100%', borderRadius: 30, backgroundColor: '#CCC', marginTop: 10 }}
                                                buttonStyle={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: '#48A2E2', borderRadius: 10 }}
                                                textStyle={{ color: '#48A2E2' }}
                                                containerStyle={{ marginBottom: 20, gap: 10, backgroundColor: 'transparent', borderWidth: 0 }}
                                        />
                                </View>
                                <Card
                                        deleteCampaign={deleteCampaign}
                                        session={session}
                                        route={route}
                                        getCampaigns={getCampaigns}
                                />
                        </View>
                </ScrollView>
        )
}

export default Campaigns