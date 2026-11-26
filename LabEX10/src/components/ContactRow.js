import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function ContactRow({ user, onPress }) {

    const initials = user.name
        .split(' ')
        .slice(0, 2)
        .map((name) => name.charAt(0))
        .join('');

    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                pressed && styles.pressed,
            ]}
            onPress={onPress}
        >

            <View style={styles.avatar}>
                <Text style={styles.initials}>
                    {initials}
                </Text>
            </View>

            <View style={styles.information}>

                <Text style={styles.name}>
                    {user.name}
                </Text>

                <Text style={styles.email}>
                    {user.email}
                </Text>

            </View>

            <Text style={styles.arrow}>›</Text>

        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#DCE5F7',
    },
    pressed: {
        opacity: 0.6,
        backgroundColor: '#DCE5F7',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#526A9C',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    initials: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    information: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333333',
    },
    email: {
        fontSize: 13,
        color: '#666666',
        marginTop: 4,
    },
    arrow: {
        fontSize: 28,
        color: '#526A9C',
        marginLeft: 8,
    },
});