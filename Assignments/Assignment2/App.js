
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

// Main Pay Calculator screen
function PayCalculatorScreen({ navigation }) {
  const [hoursWorked, setHoursWorked] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [taxRate, setTaxRate] = useState('');

  const [pay, setPay] = useState(0);
  const [overtimePay, setOvertimePay] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [tax, setTax] = useState(0);

  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Calculate regular pay, overtime, total pay, and tax
  const calculatePay = () => {
    const hours = Number(hoursWorked);
    const rate = Number(hourlyRate);
    const taxRateValue = Number(taxRate);

    
// Validate Hours Worked
if (
  hoursWorked.trim() === '' ||
  !Number.isFinite(hours) ||
  hours <= 0
) {
  setError('Please enter valid hours worked.');
  setShowResults(false);
  return;
}

// Validate Hourly Rate
if (
  hourlyRate.trim() === '' ||
  !Number.isFinite(rate) ||
  rate <= 0
) {
  setError('Please enter a valid hourly rate.');
  setShowResults(false);
  return;
}

// Validate Tax Rate
if (
  taxRate.trim() === '' ||
  !Number.isFinite(taxRateValue) ||
  taxRateValue <= 0 ||
  taxRateValue > 100
) {
  setError('Please enter a valid tax rate between 0 and 100%.');
  setShowResults(false);
  return;
}


    setError('');

    let regularPay = 0;
    let overtime = 0;

    if (hours <= 40) {
      regularPay = hours * rate;
      overtime = 0;
    } else {
      regularPay = 40 * rate;
      overtime = (hours - 40) * rate * 1.5;
    }

    // Tax is calculated on regular pay only
    const total = regularPay + overtime;
    const calculatedTax = regularPay * (taxRateValue / 100);

    setPay(regularPay);
    setOvertimePay(overtime);
    setTotalPay(total);
    setTax(calculatedTax);
    setShowResults(true);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.calculator}>
        <Text style={styles.title}>Pay Calculator</Text>

        {/* Hours Worked */}
        <Text style={styles.label}>Hours Worked</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter hours worked"
          keyboardType="numeric"
          value={hoursWorked}
          onChangeText={setHoursWorked}
        />

        {/* Hourly Rate */}
        <Text style={styles.label}>Hourly Rate</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter hourly rate"
          keyboardType="numeric"
          value={hourlyRate}
          onChangeText={setHourlyRate}
        />

        {/* Tax Rate */}
        <Text style={styles.label}>Tax Rate (%)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter tax rate"
          keyboardType="numeric"
          value={taxRate}
          onChangeText={setTaxRate}
        />

        <Text style={styles.helperText}>
          Enter 10 for 10%
        </Text>

        {/* Validation Error */}
        {error !== '' && (
          <Text style={styles.error}>{error}</Text>
        )}

        {/* Calculate Button */}
        <Pressable
          style={styles.button}
          onPress={calculatePay}
        >
          <Text style={styles.buttonText}>Calculate</Text>
        </Pressable>

        {/* Results appear after Calculate is clicked */}
        {showResults && (
          <View style={styles.results}>
            <Text style={styles.resultsTitle}>
              Calculation Results
            </Text>

            <Text style={styles.resultText}>
              Pay: ${pay.toFixed(2)}
            </Text>

            <Text style={styles.resultText}>
              Overtime Pay: ${overtimePay.toFixed(2)}
            </Text>

            <Text style={styles.resultText}>
              Total Pay: ${totalPay.toFixed(2)}
            </Text>

            <Text style={styles.resultText}>
              Tax: ${tax.toFixed(2)}
            </Text>
          </View>
        )}

        {/* About Button */}
        <Pressable
          style={styles.aboutButton}
          onPress={() => navigation.navigate('About')}
        >
          <Text style={styles.aboutButtonText}>About</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

// About screen
function AboutScreen({ navigation }) {
  return (
    <View style={styles.aboutContainer}>
      <Text style={styles.aboutTitle}>About</Text>

      <View style={styles.aboutCard}>
        <Text style={styles.aboutLabel}>Student Name</Text>
        <Text style={styles.aboutText}>Jenifa Joseph</Text>

        <Text style={styles.aboutLabel}>Student ID</Text>
        <Text style={styles.aboutText}>101571040</Text>
      </View>

      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate('Pay Calculator')}
      >
        <Text style={styles.buttonText}>
          Back to Calculator
        </Text>
      </Pressable>
    </View>
  );
}

// Navigation drawer
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Pay Calculator"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6750A4',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerActiveTintColor: '#6750A4',
          drawerInactiveTintColor: '#333333',
          drawerStyle: {
            backgroundColor: '#F3EDFA',
          },
        }}
      >
        <Drawer.Screen
          name="Pay Calculator"
          component={PayCalculatorScreen}
        />

        <Drawer.Screen
          name="About"
          component={AboutScreen}
        />
      </Drawer.Navigator>

      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EDFA',
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },

  calculator: {
    width: '100%',
    maxWidth: 420,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#514073',
    marginTop: 20,
    marginBottom: 30,
  },

  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#B8A5D6',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 20,
  },

  helperText: {
    fontSize: 15,
    color: '#6750A4',
    marginTop: -12,
    marginBottom: 20,
  },

  button: {
    width: '100%',
    backgroundColor: '#6750A4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  results: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D8C9EA',
    padding: 20,
    marginBottom: 20,
  },

  resultsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#514073',
    textAlign: 'center',
    marginBottom: 20,
  },

  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },

  error: {
    color: '#B00020',
    fontSize: 15,
    marginBottom: 10,
  },

  aboutButton: {
    width: '100%',
    backgroundColor: '#D8C9EA',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  aboutButtonText: {
    color: '#514073',
    fontSize: 18,
    fontWeight: 'bold',
  },

  aboutContainer: {
    flex: 1,
    backgroundColor: '#F3EDFA',
    alignItems: 'center',
    padding: 20,
  },

  aboutTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#514073',
    marginTop: 40,
    marginBottom: 30,
  },

  aboutCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8C9EA',
    borderRadius: 10,
    padding: 25,
    marginBottom: 25,
  },

  aboutLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#6750A4',
    marginBottom: 5,
  },

  aboutText: {
    fontSize: 20,
    color: '#333333',
    marginBottom: 20,
  },

  backButton: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#6750A4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});
