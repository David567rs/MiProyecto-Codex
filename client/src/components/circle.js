import { View, Text } from 'react-native'
import React from 'react'

const Circle = () => {
        return (
                <View style={{ width: 25, height: 25, backgroundColor: '#FFFFFF', borderRadius: 50, borderWidth: 3, alignItems: 'center', justifyContent: 'center', borderColor: '#48A2E2' }}>
                        <Text style={{ width: 10, height: 10, backgroundColor: '#48A2E2', borderRadius: 10 }} />
                </View>
        )
}

export default Circle