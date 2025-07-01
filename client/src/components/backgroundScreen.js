import { View, StyleSheet } from 'react-native'
import { Image } from '@rneui/themed'
import React from 'react'

const BACKGROUND = require('../../assets/Fondo.png');

const BackgroundScreen = ({ children }) => {

        return (
                <View style={styles.container}>
                        <View style={styles.boxTop}>
                                <Image source={BACKGROUND} style={{ width: '100%', height: '100%' }} />
                        </View>
                        {children}
                </View>
        )
}


const styles = StyleSheet.create({

        boxTop: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                zIndex: 1,
                overflow: 'hidden',
        },
        container: {
                position: 'relative',
                flex: 1,
                backgroundColor: '#DBEFED',
                alignItems: 'center',
                justifyContent: 'flex-end'
        },
})


export default BackgroundScreen