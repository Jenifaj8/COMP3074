import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DetailRow({ label, value }) {
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        marginBottom: 10,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
    },
    value: {
        marginTop: 2,
        fontSize: 16,
    },
});