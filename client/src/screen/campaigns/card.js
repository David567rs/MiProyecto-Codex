import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button, Icon, Image } from '@rneui/themed'
import { NoImgVaccineIcon } from '../../icons/iconsSvg'
import { useNavigation } from '@react-navigation/native'
const { width } = Dimensions.get('screen')

const Card = ({ route, session, getCampaigns, deleteCampaign }) => {

        const { navigate } = useNavigation()
        const Item = ({ campaign, deleteCampaign }) => {

                return (
                        <TouchableOpacity
                                onPress={() => navigate('campaigndetails', { campaign })}
                                activeOpacity={0.8}
                                style={{
                                        position: 'relative',
                                        flex: 1,
                                        borderRadius: 10,
                                        borderBottomLeftRadius: session?.typeUser == 'trabajador' && route?.name == 'campaigns' ? 0 : 10,
                                        borderBottomRightRadius: session?.typeUser == 'trabajador' && route?.name == 'campaigns' ? 0 : 10,
                                        height: '95%',
                                        shadowColor: "#000",
                                        shadowOffset: {
                                                width: 0,
                                                height: 2,
                                        },
                                        maxWidth: width / 2 - 10,
                                        shadowOpacity: 0.23,
                                        shadowRadius: 2.62,
                                        elevation: 4,
                                        backgroundColor: '#FFFFFF',
                                        margin: 10,
                                        marginBottom: session?.typeUser == 'trabajador' && route?.name == 'campaigns' ? 40 : 10,
                                        zIndex: 10,
                                }}>
                                {campaign?.images?.length > 0 ? (
                                        <Image
                                                source={{ uri: campaign.images[0] }}
                                                resizeMode='contain'
                                                style={{ width: width / 2 - 30, zIndex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10, aspectRatio: 1 / 1, objectFit: 'contain' }} />
                                ) : (
                                        <View style={{ width: '100%', height: 200, alignItems: 'center', justifyContent: 'center' }}>
                                                <NoImgVaccineIcon size={60} />
                                        </View>
                                )}
                                <Text style={{ textAlign: 'center', padding: 5, fontWeight: 'bold', fontSize: 20, color: '#48A2E2' }}>{campaign.name}</Text>
                                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Fecha:</Text>
                                <Text style={{ textAlign: 'center', fontSize: 16, color: '#48A2E2' }}>{campaign.startdate}</Text>
                                <Text style={{ textAlign: 'center', fontSize: 16, color: '#48A2E2' }}>{campaign.finaldate}</Text>
                                {session?.typeUser == 'trabajador' && route?.name == 'campaigns' && (
                                        <View style={{ width: '100%', flexDirection: 'row', position: 'absolute', bottom: -35, left: 0, zIndex: 5, borderBottomEndRadius: 10, borderBottomStartRadius: 10 }}>
                                                <Button
                                                        color='red'
                                                        icon={<Icon type='antdesign' name='delete' size={20} color='#FFFFFF' />}
                                                        containerStyle={{ paddingTop: 30, width: '50%', alignSelf: 'center', borderBottomLeftRadius: 10 }}
                                                        onPress={() => deleteCampaign(campaign._id.toString())}
                                                />
                                                <Button
                                                        color='#48A2E2'
                                                        icon={<Icon type='antdesign' name='edit' size={20} color='#FFFFFF' />}
                                                        containerStyle={{ marginTop: 30, width: '50%', borderBottomRightRadius: 10 }}

                                                />
                                        </View>
                                )}
                        </TouchableOpacity>
                )
        }

        return (
                <View style={{ flex: 1, width: '100%', gap: 20 }}>
                        <View style={{ flex: 1 }}>
                                <FlatList
                                        scrollEnabled={false}
                                        horizontal={false}
                                        data={getCampaigns}
                                        renderItem={({ item }) => <Item campaign={item} deleteCampaign={deleteCampaign} />}
                                        keyExtractor={item => item._id.toString()}
                                        numColumns={2}
                                />
                        </View>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                                <View style={{ width: '90%', height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                                        <Button color='transparent' icon={<Icon type='antdesign' name='left' color='#48A2E2' />} />
                                        <View style={{ gap: 10, flexDirection: 'row' }}>
                                                <Text style={{ width: 30, height: 30, borderWidth: 1, borderRadius: 5, borderColor: '#48A2E2', color: '#FFFFFF', backgroundColor: '#48A2E2', textAlign: 'center', paddingTop: 3, fontSize: 18, fontWeight: 'bold' }}>1</Text>
                                                <Text style={{ width: 30, height: 30, borderWidth: 1, borderRadius: 5, borderColor: '#48A2E2', color: '#48A2E2', textAlign: 'center', paddingTop: 3, fontSize: 18, fontWeight: 'bold' }}>2</Text>
                                                <Text style={{ width: 30, height: 30, borderWidth: 1, borderRadius: 5, borderColor: '#48A2E2', color: '#48A2E2', textAlign: 'center', paddingTop: 3, fontSize: 18, fontWeight: 'bold' }}>3</Text>
                                        </View>
                                        <Button color='transparent' icon={<Icon type='antdesign' name='right' color='#48A2E2' />} />
                                </View>
                        </View>
                </View>
        )
}

export default React.memo(Card)