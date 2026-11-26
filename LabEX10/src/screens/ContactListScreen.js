import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import ContactRow from '../components/ContactRow';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { getUsers } from '../api/usersApi';

export default function ContactListScreen({ navigation }) {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        try {
            setLoading(true);
            setError(null);

            const data = await getUsers();
            setUsers(data);

        } catch (err) {
            setError(err.message || 'Unable to load contacts.');
        } finally {
            setLoading(false);
        }
    }

    // Filter contacts by name
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(
            search.trim().toLowerCase()
        )
    );

    if (loading) {
        return (
            <LoadingView message="Loading contacts..." />
        );
    }

    if (error) {
        return (
            <ErrorView
                message={error}
                onRetry={loadUsers}
            />
        );
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Contact Directory
            </Text>

            <TextInput
                style={styles.searchInput}
                placeholder="Search contacts by name..."
                placeholderTextColor="#777777"
                value={search}
                onChangeText={setSearch}
            />

            <Text style={styles.count}>
                {filteredUsers.length} contacts found
            </Text>

            <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id.toString()}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                    <ContactRow
                        user={item}
                        onPress={() =>
                            navigation.navigate('Details', {
                                userId: item.id,
                            })
                        }
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>
                        No contacts found.
                    </Text>
                }
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6F8',
        padding: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#526A9C',
        textAlign: 'center',
        marginBottom: 16,
    },
    searchInput: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#526A9C',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 12,
    },
    count: {
        fontSize: 14,
        color: '#555555',
        marginBottom: 12,
    },
    empty: {
        textAlign: 'center',
        fontSize: 16,
        color: '#777777',
        marginTop: 30,
    },
});