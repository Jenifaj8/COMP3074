import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ContactListScreen from './src/screens/ContactListScreen';
import ContactDetailsScreen from './src/screens/ContactDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="Contacts"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#526A9C',
                    },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: {
                        fontWeight: '700',
                        fontSize: 20,
                    },
                    headerTitleAlign: 'center',
                    contentStyle: {
                        backgroundColor: '#F4F6F8',
                    },
                }}
            >

                <Stack.Screen
                    name="Contacts"
                    component={ContactListScreen}
                    options={{
                        title: 'Contacts',
                    }}
                />

                <Stack.Screen
                    name="Details"
                    component={ContactDetailsScreen}
                    options={{
                        title: 'Contact Details',
                    }}
                />

            </Stack.Navigator>

        </NavigationContainer>
    );
}