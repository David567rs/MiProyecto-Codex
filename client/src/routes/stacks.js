import React, { useContext, useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/login/login';
import DrawerScreen from './drawers';
import Recovery from '../screen/recovery/recovery';
import Entercode from '../screen/enterCode/entercode';
import ChangePassword from '../screen/changePasword/changePassword';
import { GlobalContext } from '../contexts/globalContext';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

const StackScreen = () => {

        const { session, verifySession, loading } = useContext(GlobalContext)

        useEffect(() => {
                verifySession();
        }, []);

        if (loading) {

                return (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size='large' color='#48A2E2' />
                        </View>
                )
        }

        return (
                <Stack.Navigator
                        initialRouteName={session ? 'principal' : 'login'}
                >
                        <Stack.Screen
                                name='principal'
                                component={DrawerScreen}
                                options={{
                                        headerShown: false
                                }}
                        />
                        <Stack.Screen
                                name='login'
                                component={Login}
                                options={{
                                        headerShown: false
                                }}
                        />
                        <Stack.Screen
                                name='recovery'
                                component={Recovery}
                                options={{
                                        headerShown: false
                                }}
                        />
                        <Stack.Screen
                                name='entercode'
                                component={Entercode}
                                options={{
                                        headerShown: false
                                }}
                        />
                        <Stack.Screen
                                name='changepassword'
                                component={ChangePassword}
                                options={{
                                        headerShown: false
                                }}
                        />
                </Stack.Navigator>
        )
}

export default StackScreen