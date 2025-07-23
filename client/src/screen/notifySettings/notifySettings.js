import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { ListItem } from '@rneui/base'
import { Image, Switch } from '@rneui/themed'

const NotifySettings = () => {

        const [checked, setChecked] = useState(false)
        return (
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 100 }}>
                        <View style={{
                                width: '95%', alignItems: 'center', backgroundColor: '#FFFFFF', shadowColor: "#000",
                                shadowOffset: {
                                        width: 0,
                                        height: 2,
                                },
                                shadowOpacity: 0.23,
                                shadowRadius: 2.62,
                                elevation: 4,
                                borderRadius: 10,
                                paddingVertical: 10,
                        }}>
                                <View style={{ width: '100%', paddingVertical: 10 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingVertical: 10 }}>Notificaciones</Text>
                                        <ListItem onPress={() => navigation.navigate('personalinfochildren')} containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                                                <Image source={require('../../../assets/icons/icons8-activar-100.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title>Activar notificaciones</ListItem.Title>
                                                </ListItem.Content>
                                                <Switch
                                                        value={checked}
                                                        onValueChange={(value) => setChecked(value)}
                                                />
                                        </ListItem>
                                        <ListItem onPress={() => navigation.navigate('healthchildren')} containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                                                <Image source={require('../../../assets/icons/icons8-musical-100.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title>Tono de notificaciones</ListItem.Title>
                                                </ListItem.Content>
                                                <ListItem.Chevron color='#48A2E2' size={30} />
                                        </ListItem>
                                        <ListItem onPress={() => navigation.navigate('birth')} containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                                                <Image source={require('../../../assets/icons/icons8-campana-100.png')} style={{ width: 30, height: 30 }} />
                                                <ListItem.Content>
                                                        <ListItem.Title>Vibración</ListItem.Title>
                                                </ListItem.Content>
                                                <ListItem.Chevron color='#48A2E2' size={30} />
                                        </ListItem>
                                </View>
                        </View>
                </ScrollView>
        )
}

export default NotifySettings