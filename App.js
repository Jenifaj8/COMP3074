
import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Linking,
} from 'react-native';

// Get initials from user's name
function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
}

// User List Item
function UserItem({ user, onPress }) {
  return (
    <Pressable style={styles.userItem} onPress={onPress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {getInitials(user.name)}
        </Text>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {user.name}
        </Text>

        <Text style={styles.userEmail}>
          {user.email}
        </Text>
      </View>
    </Pressable>
  );
}

export default function App() {

  // Application state
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // Retrieve users from JSONPlaceholder
  const loadUsers = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);

    } catch (err) {
      setError(
        'Unable to load users. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load users when application starts
  useEffect(() => {
    loadUsers();
  }, []);

  // Search users by name
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(
      search.trim().toLowerCase()
    )
  );

  // Open email, phone, or website
  const openLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (err) {
      console.log('Unable to open link:', err);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color="#526A9C"
        />

        <Text style={styles.message}>
          Loading users...
        </Text>
      </View>
    );
  }

  // Error screen with Retry button
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          {error}
        </Text>

        <Pressable
          style={styles.retryButton}
          onPress={() => loadUsers()}
        >
          <Text style={styles.buttonText}>
            Retry
          </Text>
        </Pressable>
      </View>
    );
  }

  // User List Screen
  if (selectedUser === null) {
    return (
      <SafeAreaView style={styles.container}>

        <Text style={styles.title}>
          Users
        </Text>

        {/* Total users and Refresh button */}
        <View style={styles.toolbar}>
          <Text style={styles.totalUsers}>
            Total Users: {users.length}
          </Text>

          <Pressable
            style={styles.refreshButton}
            onPress={() => {
              setSearch('');
              loadUsers(true);
            }}
            disabled={refreshing}
          >
            <Text style={styles.buttonText}>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Text>
          </Pressable>
        </View>

        {/* Search field */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search users by name..."
          placeholderTextColor="#888888"
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
        />

        {/* Refresh indicator */}
        {refreshing && (
          <ActivityIndicator
            size="small"
            color="#526A9C"
            style={styles.refreshIndicator}
          />
        )}

        {/* User list */}
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <UserItem
              user={item}
              onPress={() => setSelectedUser(item)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>
              No users found.
            </Text>
          }
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
        />

      </SafeAreaView>
    );
  }

  // User Details Screen
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView contentContainerStyle={styles.details}>

        {/* Back button */}
        <Pressable
          style={styles.backButton}
          onPress={() => setSelectedUser(null)}
        >
          <Text style={styles.buttonText}>
            Back to Users
          </Text>
        </Pressable>

        <Text style={styles.detailsTitle}>
          User Details
        </Text>

        {/* User avatar */}
        <View style={styles.profileSection}>
          <View style={styles.largeAvatar}>
            <Text style={styles.largeAvatarText}>
              {getInitials(selectedUser.name)}
            </Text>
          </View>

          <Text style={styles.profileName}>
            {selectedUser.name}
          </Text>
        </View>

        {/* Personal Information */}
        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Personal Information
          </Text>

          <Text style={styles.detailLabel}>ID</Text>
          <Text style={styles.detailValue}>
            {selectedUser.id}
          </Text>

          <Text style={styles.detailLabel}>Name</Text>
          <Text style={styles.detailValue}>
            {selectedUser.name}
          </Text>

          <Text style={styles.detailLabel}>Username</Text>
          <Text style={styles.detailValue}>
            {selectedUser.username}
          </Text>

          <Text style={styles.detailLabel}>Email</Text>
          <Text
            style={styles.linkText}
            onPress={() =>
              openLink(`mailto:${selectedUser.email}`)
            }
          >
            {selectedUser.email}
          </Text>

          <Text style={styles.detailLabel}>Phone</Text>
          <Text
            style={styles.linkText}
            onPress={() =>
              openLink(`tel:${selectedUser.phone}`)
            }
          >
            {selectedUser.phone}
          </Text>

          <Text style={styles.detailLabel}>Website</Text>
          <Text
            style={styles.linkText}
            onPress={() =>
              openLink(`https://${selectedUser.website}`)
            }
          >
            {selectedUser.website}
          </Text>

        </View>

        {/* Address */}
        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Address
          </Text>

          <Text style={styles.detailLabel}>Street</Text>
          <Text style={styles.detailValue}>
            {selectedUser.address.street}
          </Text>

          <Text style={styles.detailLabel}>Suite</Text>
          <Text style={styles.detailValue}>
            {selectedUser.address.suite}
          </Text>

          <Text style={styles.detailLabel}>City</Text>
          <Text style={styles.detailValue}>
            {selectedUser.address.city}
          </Text>

          <Text style={styles.detailLabel}>Zip Code</Text>
          <Text style={styles.detailValue}>
            {selectedUser.address.zipcode}
          </Text>

        </View>

        {/* Geographic Coordinates */}
        <View style={styles.coordinatesCard}>

          <Text style={styles.sectionTitle}>
            Geographic Coordinates
          </Text>

          <Text style={styles.detailLabel}>
            Latitude
          </Text>
          <Text style={styles.coordinateValue}>
            {selectedUser.address.geo.lat}
          </Text>

          <Text style={styles.detailLabel}>
            Longitude
          </Text>
          <Text style={styles.coordinateValue}>
            {selectedUser.address.geo.lng}
          </Text>

        </View>

        {/* Company */}
        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Company
          </Text>

          <Text style={styles.detailLabel}>
            Company Name
          </Text>
          <Text style={styles.detailValue}>
            {selectedUser.company.name}
          </Text>

          <Text style={styles.detailLabel}>
            Catch Phrase
          </Text>
          <Text style={styles.detailValue}>
            {selectedUser.company.catchPhrase}
          </Text>

          <Text style={styles.detailLabel}>
            Business
          </Text>
          <Text style={styles.detailValue}>
            {selectedUser.company.bs}
          </Text>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 16,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F4F6F8',
  },

  // Centered Users heading
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333333',
  },

  // Total users and Refresh toolbar
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  totalUsers: {
    fontSize: 15,
    color: '#555555',
  },

  // Refresh button with right spacing
  refreshButton: {
    backgroundColor: '#526A9C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 15,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },

  refreshIndicator: {
    marginBottom: 10,
  },

  // Search field
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6DCE8',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 18,
    color: '#333333',
  },

  listContent: {
    paddingBottom: 30,
  },

  // User list item
  userItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  userInfo: {
    flex: 1,
  },

  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },

  userEmail: {
    fontSize: 14,
    marginTop: 4,
    color: '#526A9C',
  },

  // Circular avatars
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#DCE5F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  avatarText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#526A9C',
  },

  // User Details padding
  details: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  // Centered User Details heading
  detailsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333333',
  },

  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },

  largeAvatar: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: '#DCE5F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  largeAvatarText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#526A9C',
  },

  profileName: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#526A9C',
    textAlign: 'center',
  },

  // Information cards
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
  },

  coordinatesCard: {
    backgroundColor: '#E9EFFB',
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#CBD8F0',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#526A9C',
    marginBottom: 12,
  },

  detailLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#555555',
    marginTop: 12,
  },

  detailValue: {
    fontSize: 16,
    color: '#333333',
    marginTop: 4,
    lineHeight: 23,
  },

  // Highlighted contact links
  linkText: {
    fontSize: 16,
    color: '#1D4ED8',
    marginTop: 4,
    textDecorationLine: 'underline',
    lineHeight: 23,
  },

  coordinateValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#526A9C',
    marginTop: 4,
  },

  // Back button
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#1D4ED8',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 18,
  },

  // Loading and error screens
  message: {
    marginTop: 10,
    fontSize: 16,
  },

  errorText: {
    fontSize: 17,
    color: '#B00020',
    textAlign: 'center',
    marginBottom: 20,
  },

  retryButton: {
    backgroundColor: '#526A9C',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },

  emptyMessage: {
    fontSize: 16,
    color: '#777777',
    textAlign: 'center',
    marginTop: 30,
  },

});
