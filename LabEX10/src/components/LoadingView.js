import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function LoadingView({ message }) {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                size="large"
                color="#526A9C"
            />

            <Text style={styles.message}>
                {message}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F4F6F8',
        padding: 24,
    },
    message: {
        marginTop: 12,
        fontSize: 16,
        color: '#526A9C',
    },
});