import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useContext, useEffect } from 'react'
import Home from '../screen/home/home'
import { Button, Icon, Image } from '@rneui/themed'
import { babyIcon, jeringaIcon, settingIcon } from '../icons/iconSrc'
import Children from '../screen/children/children'
import Vaccines from '../screen/vaccines/vaccines'
import VaccinesPublic from '../screen/vaccines/vaccinesP'
import Settings from '../screen/settings/settings'
import ProfileChildren from '../screen/profileChildren/profileChildren'
import PersonalInfoChildren from '../screen/personalInfoChildren/personalInfoChildren'
import HealthChildren from '../screen/healthChildren/healthChildren'
import Birth from '../screen/birth/birth'
import VaccineList from '../screen/vaccineList/vaccineList'
import VaccineDetail from '../screen/vaccineDetail/vaccineDetail'
import Notifications from '../screen/notifications/notifications'
import NotifySettings from '../screen/notifySettings/notifySettings'
import Security from '../screen/security/security'
import Backup from '../screen/backup/backup'
import { GlobalContext } from '../contexts/globalContext'
import VaccinesMedic from '../screen/vaccinesMedic/vaccinesMedic'
import AddVaccine from '../screen/addVaccine/addVaccine'
import AddCampaign from '../screen/addCampaign/addCampaign'
import Campaigns from '../screen/campaigns/campaigns'
import Hospitals from '../screen/hospitals/hospitals'
import AddHospital from '../screen/addHospital/addHospital'
import HospitalDetail from '../screen/hospitalDetail/hospitalDetail'
import Sliders from '../screen/sliders/sliders'
import AddSlider from '../screen/addSlider/addSlider'
import PersonalInfoUser from '../screen/personalInfoUser/personalInfoUser'
import Profession from '../screen/profession/profession'
import Domicile from '../screen/domicile/domicile'
import ParentAndVaccines from '../screen/parentAndVaccines/parentAndVaccines'
import AddMonth from '../screen/addMonth/addMonth'
import ParentsChildren from '../screen/parentsChildren/parentsChildren'
import CampaignDetails from '../screen/campaignDetails/campaignDetails'
import VaccinationCalendar from '../screen/vaccinationCalendar/vaccinationCalendar'
import AddChildren from '../screen/addChildren/addChildren'
import vaccinesP from '../screen/vaccines/vaccinesP'
import ChildDevelopment from '../screen/childDevelopment/childDevelopment'
import ChildAgeControl from '../screen/childDevelopment/childAgeControl'
import EarlyDetection from '../screen/childDevelopment/earlyDetection'
import vaccineListP from '../screen/vaccineList/vaccineListP'
import VaccineDetailP from '../screen/vaccineDetail/vaccineDetailP'
import CrianzaCarinosa from '../screen/childDevelopment/crianzaCarinosa'
import DentalControl from '../screen/dentalControl/dentalcontrol'
import SendHealthReport from '../screen/sendHealthReport/sendHealthReport'

const Tabs = createBottomTabNavigator()

const TabScreen = () => {

        const { session } = useContext(GlobalContext)

        return (
                <Tabs.Navigator
                        screenOptions={{
                                headerShown: true,
                                tabBarStyle: {
                                        position: 'absolute',
                                        bottom: 25,                                
                                        alignSelf: 'center',                      
                                        height: 60,                                
                                        borderRadius: 30,
                                        backgroundColor: '#48A2E2',
                                        paddingHorizontal: 20,                     
                                        paddingTop: 4,                            
                                        paddingBottom: 5,                          
                                        elevation: 5,                              
                                        zIndex: 10,
                                },
                                tabBarShowLabel: false,
                        }}
                >
                        <Tabs.Screen
                                name='home'
                                component={Home}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarIcon: ({ color, size }) => (
                                                <Icon type='antdesign' name='home' color='#FFFFFF' size={30} />
                                        ),
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
                                        headerTitle: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45 }} />
                                        ),
                                        headerTitleAlign: 'center',
                                        headerLeft: () => (
                                                <Button
                                                        color='transparent'
                                                        icon={
                                                                <Icon
                                                                        name='menu'
                                                                        size={30}
                                                                        color='#FFFFFF'
                                                                />
                                                        }
                                                        onPress={() => navigation.openDrawer()}
                                                />
                                        ),
                                        headerRight: () => (
                                                <Button
                                                        color='transparent'
                                                        icon={() => (
                                                                session?.image !== "" ? (
                                                                        <Image source={{ uri: session?.image }} style={{ width: 35, height: 35, borderRadius: 40 }} />
                                                                ) : (
                                                                        <Image source={require('../../assets/icons/user.png')} style={{ width: 35, height: 35, borderRadius: 40 }} />
                                                                )
                                                        )
                                                        }
                                                        onPress={() => navigation.openDrawer()}
                                                />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        {session !== null && session?.typeUser === 'trabajador' ? (
                                <>
                                        <Tabs.Screen
                                                name='parentandvaccines' //vaccinesmedic
                                                component={ParentAndVaccines}
                                                options={({ route, navigation }) => ({
                                                        title: null,
                                                        tabBarIcon: ({ color, size }) => (
                                                                <Image source={babyIcon} style={{ width: 35, height: 35 }} />
                                                        ),
                                                        headerStyle: {
                                                                backgroundColor: '#48A2E2',
                                                        },
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

                                                                />
                                                        ),
                                                        headerTitle: 'Padres',
                                                        headerTitleAlign: 'center',
                                                        headerRight: () => (
                                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                                        ),
                                                        headerTintColor: '#FFFFFF',
                                                })}
                                        />
                                        <Tabs.Screen
                                                name='vaccinesmedic' //vaccinesmedic
                                                component={VaccinesMedic}
                                                options={({ route, navigation }) => ({
                                                        title: null,
                                                        tabBarButton: () => null,
                                                        headerStyle: {
                                                                backgroundColor: '#48A2E2',
                                                        },
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
                                                                        onPress={() => navigation.navigate('parentandvaccines')}

                                                                />
                                                        ),
                                                        headerTitle: 'Vacunas',
                                                        headerTitleAlign: 'center',
                                                        headerRight: () => (
                                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                                        ),
                                                        headerTintColor: '#FFFFFF',
                                                })}
                                        />
                                        <Tabs.Screen
                                                name='addvaccine'
                                                component={AddVaccine}
                                                options={({ route, navigation }) => ({
                                                        title: null,
                                                        tabBarButton: () => null,
                                                        headerStyle: {
                                                                backgroundColor: '#48A2E2',
                                                        },
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
                                                                        onPress={() => navigation.navigate('vaccinesmedic')}
                                                                />
                                                        ),
                                                        headerTitle: 'Vacunas',
                                                        headerTitleAlign: 'center',
                                                        headerRight: () => (
                                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                                        ),
                                                        headerTintColor: '#FFFFFF',
                                                })}
                                        />
                                        <Tabs.Screen
                                                name='campaigns'
                                                component={Campaigns}
                                                options={({ route, navigation }) => ({
                                                        title: null,
                                                        tabBarIcon: ({ color, size }) => (
                                                                <Image source={jeringaIcon} style={{ width: 30, height: 30 }} />
                                                        ),
                                                        headerStyle: {
                                                                backgroundColor: '#48A2E2',
                                                        },
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
                                                                        onPress={() => navigation.navigate('home')}
                                                                />
                                                        ),
                                                        headerTitle: 'Campañas',
                                                        headerTitleAlign: 'center',
                                                        headerRight: () => (
                                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                                        ),
                                                        headerTintColor: '#FFFFFF',
                                                })}
                                        />
                                        <Tabs.Screen
                                                name='addcampaign'
                                                component={AddCampaign}
                                                options={({ route, navigation }) => ({
                                                        title: null,
                                                        tabBarButton: () => null,
                                                        headerStyle: {
                                                                backgroundColor: '#48A2E2',
                                                        },
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
                                                                        onPress={() => navigation.navigate('home')}
                                                                />
                                                        ),
                                                        headerTitle: 'Campañas',
                                                        headerTitleAlign: 'center',
                                                        headerRight: () => (
                                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                                        ),
                                                        headerTintColor: '#FFFFFF',
                                                })}
                                        />
                                        <Tabs.Screen
                                                name='hospitals'
                                                component={Hospitals}
                                                options={({ route, navigation }) => ({
                                                        title: null,
                                                        tabBarButton: () => null,
                                                        headerStyle: {
                                                                backgroundColor: '#48A2E2',
                                                        },
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
                                                                        onPress={() => navigation.navigate('home')}
                                                                />
                                                        ),
                                                        headerTitle: 'Hospitales',
                                                        headerTitleAlign: 'center',
                                                        headerRight: () => (
                                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                                        ),
                                                        headerTintColor: '#FFFFFF',
                                                })}
                                        />
                                        <Tabs.Screen
                                                name='addhospital'
                                                component={AddHospital}
                                                options={({ route, navigation }) => ({
                                                        title: null,
                                                        tabBarButton: () => null,
                                                        headerStyle: {
                                                                backgroundColor: '#48A2E2',
                                                        },
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
                                                                        onPress={() => navigation.navigate('settings')}
                                                                />
                                                        ),
                                                        headerTitle: 'Hospitales',
                                                        headerTitleAlign: 'center',
                                                        headerRight: () => (
                                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                                        ),
                                                        headerTintColor: '#FFFFFF',
                                                })}
                                        />
                                        <Tabs.Screen
                                                name='sliders'
                                                component={Sliders}
                                                options={({ route, navigation }) => ({
                                                        title: null,
                                                        tabBarButton: () => null,
                                                        headerStyle: {
                                                                backgroundColor: '#48A2E2',
                                                        },
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
                                                                        onPress={() => navigation.navigate('settings')}
                                                                />
                                                        ),
                                                        headerTitle: 'Slider',
                                                        headerTitleAlign: 'center',
                                                        headerRight: () => (
                                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                                        ),
                                                        headerTintColor: '#FFFFFF',
                                                })}
                                        />
                                        <Tabs.Screen
                                                name='addslider'
                                                component={AddSlider}
                                                options={({ route, navigation }) => ({
                                                        title: null,
                                                        tabBarButton: () => null,
                                                        headerStyle: {
                                                                backgroundColor: '#48A2E2',
                                                        },
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
                                                                        onPress={() => navigation.navigate('sliders')}
                                                                />
                                                        ),
                                                        headerTitle: 'Slider',
                                                        headerTitleAlign: 'center',
                                                        headerRight: () => (
                                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                                        ),
                                                        headerTintColor: '#FFFFFF',
                                                })}
                                        />
                                        <Tabs.Screen
                                                name='profession'
                                                component={Profession}
                                                options={({ route, navigation }) => ({
                                                        title: null,
                                                        tabBarButton: () => null,
                                                        headerStyle: {
                                                                backgroundColor: '#48A2E2',
                                                        },
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
                                                                        onPress={() => navigation.navigate('settings')}
                                                                />
                                                        ),
                                                        headerTitle: 'Profesión',
                                                        headerTitleAlign: 'center',
                                                        headerRight: () => (
                                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                                        ),
                                                        headerTintColor: '#FFFFFF',
                                                })}
                                        />
                                        <Tabs.Screen
                                                name='addmonth'
                                                component={AddMonth}
                                                options={({ route, navigation }) => ({
                                                        title: null,
                                                        tabBarButton: () => null,
                                                        headerStyle: {
                                                                backgroundColor: '#48A2E2',
                                                        },
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
                                                                        onPress={() => navigation.navigate('parentandvaccines')}
                                                                />
                                                        ),
                                                        headerTitle: 'Vacunas',
                                                        headerTitleAlign: 'center',
                                                        headerRight: () => (
                                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                                        ),
                                                        headerTintColor: '#FFFFFF',
                                                })}
                                        />
                                        <Tabs.Screen
                                                name='parentschildren'
                                                component={ParentsChildren}
                                                options={({ route, navigation }) => ({
                                                        title: null,
                                                        tabBarButton: () => null,
                                                        headerStyle: {
                                                                backgroundColor: '#48A2E2',
                                                        },
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
                                                                        onPress={() => navigation.navigate('parentandvaccines')}
                                                                />
                                                        ),
                                                        headerTitle: 'Padres-Hijos',
                                                        headerTitleAlign: 'center',
                                                        headerRight: () => (
                                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                                        ),
                                                        headerTintColor: '#FFFFFF',
                                                })}
                                        />

                                </>
                        ) : (
                                <>
                                        <Tabs.Screen
                                                name='children'
                                                component={Children}
                                                options={({ route, navigation }) => ({
                                                        title: null,
                                                        tabBarIcon: ({ color, size }) => (
                                                                <Image source={babyIcon} style={{ width: 35, height: 35 }} />
                                                        ),
                                                        headerStyle: {
                                                                backgroundColor: '#48A2E2',
                                                        },
                                                        headerTitle: 'Hijos',
                                                        headerTitleAlign: 'center',
                                                        headerRight: () => (
                                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                                        ),
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
                                                                        onPress={() => navigation.navigate('home')}
                                                                />
                                                        ),
                                                        headerTintColor: '#FFFFFF',
                                                })}
                                        />
                                        <Tabs.Screen
                                                name='vaccinesChildren'
                                                component={Vaccines}
                                                options={({ route, navigation }) => ({
                                                        title: null,
                                                        tabBarButton: () => null,
                                                        tabBarIcon: () => {
                                                                return (
                                                                        <Image source={jeringaIcon} style={{ width: 30, height: 30 }} />
                                                                )
                                                        },
                                                        headerStyle: {
                                                                backgroundColor: '#48A2E2',
                                                        },
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
                                                                        onPress={() => navigation.navigate('children')}
                                                                />
                                                        ),
                                                        headerTitle: 'Vacunas',
                                                        headerTitleAlign: 'center',
                                                        headerRight: () => (
                                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                                        ),
                                                        headerTintColor: '#FFFFFF',
                                                })}
                                        />

                                        <Tabs.Screen
                                                name='vaccines'
                                                component={VaccinesPublic}
                                                options={({ route, navigation }) => ({
                                                        title: null,
                                                        tabBarIcon: () => {
                                                                return (
                                                                        <Image source={jeringaIcon} style={{ width: 30, height: 30 }} />
                                                                )
                                                        },
                                                        headerStyle: {
                                                                backgroundColor: '#48A2E2',
                                                        },
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
                                                                        onPress={() => navigation.navigate('children')}
                                                                />
                                                        ),
                                                        headerTitle: 'Vacunas',
                                                        headerTitleAlign: 'center',
                                                        headerRight: () => (
                                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                                        ),
                                                        headerTintColor: '#FFFFFF',
                                                })}
                                        />
                                </>
                        )}
                        <Tabs.Screen
                                name='addchildren'
                                component={AddChildren}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('settings')}
                                                />
                                        ),
                                        headerTitle: 'Hijos',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='domicile'
                                component={Domicile}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('settings')}
                                                />
                                        ),
                                        headerTitle: 'Domicilio',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='vaccinelist'
                                component={vaccineListP}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('children')}
                                                />
                                        ),
                                        headerTitle: 'Vacunas',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='vaccinelistChildren'
                                component={VaccineList}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('vaccinesChildren', { children: route.params.children, month: route.params.month })}
                                                />
                                        ),
                                        headerTitle: 'Vacunas',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />


                        <Tabs.Screen
                                name='vaccinedetail'
                                component={VaccineDetailP}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('vaccines')}
                                                />
                                        ),
                                        headerTitle: 'Vacunas',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='vaccinedetailChildren'
                                component={VaccineDetail}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('vaccinelistChildren', { children: route.params.children, month: route.params.month })}
                                                />
                                        ),
                                        headerTitle: 'Vacunas',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />

                        <Tabs.Screen
                                name='hospitaldetail'
                                component={HospitalDetail}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('hospitals')}
                                                />
                                        ),
                                        headerTitle: 'Hospitales',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='settings'
                                component={Settings}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarIcon: ({ color, size }) => (
                                                <Image source={settingIcon} style={{ width: 30, height: 30 }} />
                                        ),
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('home')}
                                                />
                                        ),
                                        headerTitle: 'Ajustes',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='profilechildren'
                                component={ProfileChildren}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('children')}
                                                />
                                        ),
                                        headerTitle: 'Hijos',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='personalinfochildren'
                                component={PersonalInfoChildren}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('profilechildren', { children: route.params?.children })}
                                                />
                                        ),
                                        headerTitle: 'Datos personales',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='personalinfouser'
                                component={PersonalInfoUser}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('settings')}
                                                />
                                        ),
                                        headerTitle: 'Datos personales',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='healthchildren'
                                component={HealthChildren}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('profilechildren', { children: route.params?.children })}
                                                />
                                        ),
                                        headerTitle: 'Salud',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='birth'
                                component={Birth}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                       onPress={() => navigation.navigate('profilechildren', { children: route.params?.children })}
                                                />
                                        ),
                                        headerTitle: 'Nacimiento',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='childdevelopment'
                                component={ChildDevelopment}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('profilechildren', { children: route.params?.children })}
                                                />
                                        ),
                                        headerTitle: 'Desarrollo',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='notifications'
                                component={Notifications}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('home')}
                                                />
                                        ),
                                        headerTitle: 'Notificaciones',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='notifysettings'
                                component={NotifySettings}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('notifications')}
                                                />
                                        ),
                                        headerTitle: 'Notificaciones',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='security'
                                component={Security}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('home')}
                                                />
                                        ),
                                        headerTitle: 'Seguridad',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='backup'
                                component={Backup}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('home')}
                                                />
                                        ),
                                        headerTitle: 'Seguridad',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='campaigndetails'
                                component={CampaignDetails}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('home')}
                                                />
                                        ),
                                        headerTitle: 'Campañas',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='vaccinationcalendar'
                                component={VaccinationCalendar}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('home')}
                                                />
                                        ),
                                        headerTitle: 'Esquema',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />

                        <Tabs.Screen
                                name='childagecontrol'
                                component={ChildAgeControl}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('profilechildren', { children: route.params?.children })}
                                                />
                                        ),
                                        headerTitle: 'Control por Edad',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />
                        <Tabs.Screen
                                name='detection'
                                component={EarlyDetection}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('profilechildren', { children: route.params?.children })}
                                                />
                                        ),
                                        headerTitle: 'Detección de enfermedades',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />

                         <Tabs.Screen
                                name='crianzacarinosa'
                                component={CrianzaCarinosa}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('profilechildren', { children: route.params?.children })}
                                                />
                                        ),
                                        headerTitle: 'Crianza cariñosa',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />

                         <Tabs.Screen
                                name='dentalcontrol'
                                component={DentalControl}
                                options={({ route, navigation }) => ({
                                        title: null,
                                        tabBarButton: () => null,
                                        headerStyle: {
                                                backgroundColor: '#48A2E2',
                                        },
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
                                                        onPress={() => navigation.navigate('profilechildren', { children: route.params?.children })}
                                                />
                                        ),
                                        headerTitle: 'Control dental',
                                        headerTitleAlign: 'center',
                                        headerRight: () => (
                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                        ),
                                        headerTintColor: '#FFFFFF',
                                })}
                        />

                        <Tabs.Screen
                                                name='sendhealthreport'
                                                component={SendHealthReport}
                                                options={({ route, navigation }) => ({
                                                        title: null,
                                                        tabBarButton: () => null,
                                                        headerStyle: {
                                                                backgroundColor: '#48A2E2',
                                                        },
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
                                                                        onPress={() => navigation.navigate('settings')}
                                                                />
                                                        ),
                                                        headerTitle: 'Enviar Reporte',
                                                        headerTitleAlign: 'center',
                                                        headerRight: () => (
                                                                <Image source={require('../../assets/MEDICAL-(Instagram Story).png')} style={{ width: 45, height: 45, marginRight: 5 }} />
                                                        ),
                                                        headerTintColor: '#FFFFFF',
                                                })}
                                        />


                </Tabs.Navigator>
        )
}

export default TabScreen