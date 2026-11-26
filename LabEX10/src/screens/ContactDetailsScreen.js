import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import DetailRow from '../components/DetailRow';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { getUser } from '../api/usersApi';

export default function ContactDetailsScreen({ route }) {

    const { userId } = route.params;

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadUser = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getUser(userId);
            setUser(data);

        } catch (err) {
            setError(err.message || 'Unable to load contact.');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    // Open the phone dialer
    async function dialPhoneNumber(phoneNumber) {
        const url = `tel:${phoneNumber}`;

        try {
            await Linking.openURL(url);
        } catch (err) {
            Alert.alert('Error', 'The dialer could not be opened.');
        }
    }

    // Open the email application
    async function openEmail(email) {
        const url = `mailto:${email}`;

        try {
            await Linking.openURL(url);
        } catch (err) {
            Alert.alert('Error', 'The email application could not be opened.');
        }
    }

    // Open the website
    async function openWebsite(website) {
        const url = website.startsWith('http')
            ? website
            : `https://${website}`;

        try {
            await Linking.openURL(url);
        } catch (err) {
            Alert.alert('Error', 'The website could not be opened.');
        }
    }

    // Open the location in Google Maps
    async function openMap(latitude, longitude) {
        const url =
            `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

        try {
            await Linking.openURL(url);
        } catch (err) {
            Alert.alert('Error', 'The map could not be opened.');
        }
    }

    if (loading) {
        return (
            <LoadingView message="Loading contact..." />
        );
    }

    if (error) {
        return (
            <ErrorView
                message={error}
                onRetry={loadUser}
            />
        );
    }

    if (!user) {
        return null;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/* Contact Header */}

            <View style={styles.header}>

                <View style={styles.avatar}>
                    <Text style={styles.initials}>
                        {user.name
                            .split(' ')
                            .slice(0, 2)
                            .map((name) => name.charAt(0))
                            .join('')}
                    </Text>
                </View>

                <Text style={styles.title}>
                    {user.name}
                </Text>

                <Text style={styles.subtitle}>
                    @{user.username}
                </Text>

            </View>

            {/* Personal Information */}

            <View style={styles.card}>

                <Text style={styles.section}>
                    Personal Information
                </Text>

                <DetailRow
                    label="ID"
                    value={user.id.toString()}
                />

                <DetailRow
                    label="Username"
                    value={user.username}
                />

                <Text style={styles.label}>Email</Text>

                <Pressable
                    onPress={() => openEmail(user.email)}
                >
                    <Text style={styles.link}>
                        {user.email}
                    </Text>
                </Pressable>

                <Text style={styles.label}>Phone</Text>

                <Pressable
                    onPress={() => dialPhoneNumber(user.phone)}
                >
                    <Text style={styles.link}>
                        {user.phone}
                    </Text>
                </Pressable>

                <Text style={styles.label}>Website</Text>

                <Pressable
                    onPress={() => openWebsite(user.website)}
                >
                    <Text style={styles.link}>
                        {user.website}
                    </Text>
                </Pressable>

            </View>

            {/* Address Information */}

            <View style={styles.card}>

                <Text style={styles.section}>
                    Address Information
                </Text>

                <DetailRow
                    label="Street"
                    value={user.address.street}
                />

                <DetailRow
                    label="Suite"
                    value={user.address.suite}
                />

                <DetailRow
                    label="City"
                    value={user.address.city}
                />

                <DetailRow
                    label="Zip code"
                    value={user.address.zipcode}
                />

                <DetailRow
                    label="Latitude"
                    value={user.address.geo.lat}
                />

                <DetailRow
                    label="Longitude"
                    value={user.address.geo.lng}
                />

                <Pressable
                    style={styles.mapButton}
                    onPress={() =>
                        openMap(
                            user.address.geo.lat,
                            user.address.geo.lng
                        )
                    }
                >
                    <Text style={styles.buttonText}>
                        View Location on Map
                    </Text>
                </Pressable>

            </View>

            {/* Company Information */}

            <View style={styles.card}>

                <Text style={styles.section}>
                    Company Information
                </Text>

                <DetailRow
                    label="Name"
                    value={user.company.name}
                />

                <DetailRow
                    label="Catch phrase"
                    value={user.company.catchPhrase}
                />

                <DetailRow
                    label="Business"
                    value={user.company.bs}
                />

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 40,
        backgroundColor: '#F4F6F8',
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#DCE5F7',
        borderRadius: 12,
        padding: 24,
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#526A9C',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    initials: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#526A9C',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#555555',
        marginTop: 5,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#DCE5F7',
    },
    section: {
        fontSize: 20,
        fontWeight: '700',
        color: '#526A9C',
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
    },
    link: {
        marginTop: 2,
        marginBottom: 12,
        fontSize: 16,
        color: '#1D4ED8',
        textDecorationLine: 'underline',
    },
    mapButton: {
        backgroundColor: '#526A9C',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
});