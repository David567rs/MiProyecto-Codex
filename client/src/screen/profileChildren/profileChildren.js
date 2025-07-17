import { View, Text, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { Button, Icon, Image, ListItem } from '@rneui/themed';
import { GlobalContext } from '../../contexts/globalContext';

const ProfileChildren = ({ route, navigation }) => {
    const { session } = useContext(GlobalContext);
    const { children: initialChildren } = route.params;
    const [children, setChildren] = useState(initialChildren);

    useEffect(() => {
        setChildren(route.params.children);
    }, [route.params.children]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: session?.typeUser == 'trabajador' ? 'Padre-Hijo' : 'Hijos',
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
                    onPress={() => navigation.navigate(session?.typeUser == 'trabajador' ? 'parentandvaccines' : 'children')}
                />
            ),
        });
    }, [navigation, session?.typeUser]);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 80 }}>
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
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Perfil del hijo</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#00C356' }}>100%</Text>
                    <View style={{ width: '100%' }}>
                        <Svg height="100" width="100" viewBox="0 0 100 100">
                            {/* Borde rojo */}
                            <Path
                                d="M50,50 m-45,0 a45,45 0 1,0 90,0"
                                fill="none"
                                stroke="red"
                                strokeWidth="10"
                            />
                            {/* Borde amarillo */}
                            <Path
                                d="M50,50 m-45,0 a45,45 0 1,0 90,0"
                                fill="none"
                                stroke="yellow"
                                strokeWidth="10"
                                strokeDasharray="100"
                                strokeDashoffset="100"
                            />
                            {/* Borde verde */}
                            <Path
                                d="M50,50 m-45,0 a45,45 0 1,0 90,0"
                                fill="none"
                                stroke="green"
                                strokeWidth="10"
                                strokeDasharray="100"
                                strokeDashoffset="200"
                            />
                        </Svg>
                    </View>
                    <Text style={{ color: '#00C356', marginTop: 10 }}>Cuenta con todas las vacunas</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{children.name} {children.lastName} {children.secondLastName}</Text>
                    <Text style={{ color: '#48A2E2' }}>{children.curp}</Text>
                </View>
                <View style={{ width: '100%', paddingVertical: 10 }}>
                    <ListItem onPress={() => navigation.navigate('personalinfochildren', { children })} containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                        <Image source={require('../../../assets/icons/icons8-usuario-masculino-en-círculo-100.png')} style={{ width: 30, height: 30 }} />
                        <ListItem.Content>
                            <ListItem.Title>Datos Personales</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron color='#48A2E2' size={30} />
                    </ListItem>
                    <ListItem onPress={() => navigation.navigate('healthchildren', { children })} containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                        <Image source={require('../../../assets/icons/icons8-hospital-64.png')} style={{ width: 30, height: 30 }} />
                        <ListItem.Content>
                            <ListItem.Title>Salud</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron color='#48A2E2' size={30} />
                    </ListItem>
                    <ListItem onPress={() => navigation.navigate('birth', { children })} containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                        <Image source={require('../../../assets/icons/icons8-pastel-100.png')} style={{ width: 30, height: 30 }} />
                        <ListItem.Content>
                            <ListItem.Title>Nacimiento</ListItem.Title>
                        </ListItem.Content>
                        {session?.typeUser == 'paciente' && (
                            <Image source={require('../../../assets/icons/icons8-atención-96.png')} style={{ width: 30, height: 30 }} />
                        )}
                        <ListItem.Chevron color='#48A2E2' size={30} />
                    </ListItem>
                     <ListItem onPress={() => navigation.navigate('childdevelopment', { children })} containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                        <Image source={require('../../../assets/icons/icons8-bebé-80.png')} style={{ width: 30, height: 30 }} />
                        <ListItem.Content>
                            <ListItem.Title>Desarrollo</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron color='#48A2E2' size={30} />
                    </ListItem>
                    <ListItem onPress={() => navigation.navigate('childagecontrol', { children })} containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                        <Image source={require('../../../assets/icons/icons8-opciones-para-ordenar-100.png')} style={{ width: 30, height: 30 }} />
                        <ListItem.Content>
                            <ListItem.Title>Control por Edad</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron color='#48A2E2' size={30} />
                    </ListItem>
                    <ListItem onPress={() => navigation.navigate('detection', { children })} containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                        <Image source={require('../../../assets/icons/icons8-enfermedad-100.png')} style={{ width: 30, height: 30 }} />
                        <ListItem.Content>
                            <ListItem.Title>Detección temprana</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron color='#48A2E2' size={30} />
                    </ListItem>
                    <ListItem onPress={() => navigation.navigate('alarmsigns', { children })} containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                        <Image source={require('../../../assets/icons/icons8-alarma-en-80.png')} style={{ width: 30, height: 30 }} />
                        <ListItem.Content>
                            <ListItem.Title>Signos de Alarma</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron color='#48A2E2' size={30} />
                    </ListItem>
                    <ListItem onPress={() => navigation.navigate('crianzacarinosa', { children })} containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                        <Image source={require('../../../assets/icons/icons8-familia-hombre-mujer-100.png')} style={{ width: 30, height: 30 }} />
                        <ListItem.Content>
                            <ListItem.Title>Crianza cariñosa</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron color='#48A2E2' size={30} />
                    </ListItem>
                    <ListItem onPress={() => navigation.navigate('vaccinesChildren', { children })} containerStyle={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
                        <Image source={require('../../../assets/icons/icons8-jeringa-64(1).png')} style={{ width: 30, height: 30 }} />
                        <ListItem.Content>
                            <ListItem.Title>Vacunas</ListItem.Title>
                        </ListItem.Content>
                        {session?.typeUser == 'paciente' && (
                            <Image source={require('../../../assets/icons/icons8-atención-96.png')} style={{ width: 30, height: 30 }} />
                        )}
                        <ListItem.Chevron color='#48A2E2' size={30} />
                    </ListItem>
                </View>
            </View>
        </ScrollView>
    );
}

export default ProfileChildren;
