import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function ErrorView({ message, onRetry }) {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Connection Error
            </Text>

            <Text style={styles.error}>
                {message}
            </Text>

            <Text style={styles.message}>
                Please check your connection and try again.
            </Text>

            <Pressable
                style={styles.button}
                onPress={onRetry}
            >
                <Text style={styles.buttonText}>
                    Retry
                </Text>
            </Pressable>

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
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#b00020',
        marginBottom: 12,
    },
    error: {
        fontSize: 16,
        color: '#b00020',
        textAlign: 'center',
        marginBottom: 10,
    },
    message: {
        fontSize: 14,
        color: '#555555',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#526A9C',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});