import { View, Text, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Button, Image } from '@rneui/themed'
import Carousel from 'react-native-reanimated-carousel'

const { width } = Dimensions.get('window')
const sliderImage1 = require('../../../assets/S1.png')
const sliderImage2 = require('../../../assets/S2.png')
const sliderImage3 = require('../../../assets/S3.png')

const listImagesSlider = [sliderImage1, sliderImage2, sliderImage3]


const Sliders = ({route,navigation}) => {

        const [progress, setProgress] = useState(0)

        const Pagination = () => {

                return (
                        <View style={{ flexDirection: 'row', height: 20, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0 }}>
                                {listImagesSlider.map((item, index) => (
                                        <View
                                                key={index}
                                                style={{
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: 5,
                                                        marginHorizontal: 5,
                                                        backgroundColor: index === progress ? '#48A2E2' : '#CCC'
                                                }}
                                        />
                                ))}
                        </View>
                )
        }

        return (
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, alignItems: 'center', paddingBottom: 80 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Imagenes</Text>
                        <Button 
                                onPress={()=> navigation.navigate('addslider')}
                                title='Agregar Paquete' 
                                color='#48A2E2' 
                                titleStyle={{ fontWeight: 'bold' }} 
                                containerStyle={{ borderRadius: 20, width: 150 }} />
                        <View style={{ width: '100%' }}>
                                <View style={{ width: '100%', alignItems: 'center', height: (width / 2) - 45, marginTop: 10 }}>
                                        <View style={{ width: '100%', overflow: 'hidden', height: (width / 2) - 70, alignItems: 'center', borderRadius: 10 }}>
                                                <Carousel
                                                        width={width}
                                                        height={width / 2}
                                                        //autoPlay={true}
                                                        onSnapToItem={(index) => setProgress(index)}
                                                        data={listImagesSlider}
                                                        style={{ top: -35 }}
                                                        scrollAnimationDuration={1000}
                                                        pagingEnabled={true}
                                                        snapEnabled={true}
                                                        autoPlayInterval={3000}
                                                        renderItem={({ item, index }) => (
                                                                <View>
                                                                        <Image source={item} style={{ width: width, height: '100%', resizeMode: 'contain', borderRadius: 10 }} />
                                                                </View>
                                                        )
                                                        }
                                                />
                                        </View>
                                        <Pagination />
                                </View>
                                <View style={{ width: '100%', alignItems: 'center', height: (width / 2) - 45, marginTop: 10 }}>
                                        <View style={{ width: '100%', overflow: 'hidden', height: (width / 2) - 70, alignItems: 'center', borderRadius: 10 }}>
                                                <Carousel
                                                        width={width}
                                                        height={width / 2}
                                                        //autoPlay={true}
                                                        onSnapToItem={(index) => setProgress(index)}
                                                        data={listImagesSlider}
                                                        style={{ top: -35 }}
                                                        scrollAnimationDuration={1000}
                                                        pagingEnabled={true}
                                                        snapEnabled={true}
                                                        autoPlayInterval={3000}
                                                        renderItem={({ item, index }) => (
                                                                <View>
                                                                        <Image source={item} style={{ width: width, height: '100%', resizeMode: 'contain', borderRadius: 10 }} />
                                                                </View>
                                                        )
                                                        }
                                                />
                                        </View>
                                        <Pagination />
                                </View>
                        </View>
                </ScrollView>
        )
}

export default Sliders