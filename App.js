import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import AddWordScreen from './screens/AddWordScreen';
import SearchWordScreen from './screens/SearchWordScreen';
import WordListScreen from './screens/WordListScreen';

const Stack = createNativeStackNavigator();

// Flat Button with icon
function FlatButton({ title, color, onPress, icon, iconLibrary }) {
  const IconComponent = iconLibrary;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.button, { backgroundColor: color }]}>
      {icon && IconComponent && (
        <IconComponent name={icon} size={20} color="#fff" style={{ marginRight: 10 }} />
      )}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

// Home Screen with dark background
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Baha`i Glossary App</Text>

      <FlatButton
        title="Add New Word"
        color="#E63946" // red button
        onPress={() => navigation.navigate('Add Word')}
        icon="add-circle-outline"
        iconLibrary={Ionicons}
      />

      <FlatButton
        title="Search Word"
        color="#1D3557" // dark navy button
        onPress={() => navigation.navigate('Search Word')}
        icon="search"
        iconLibrary={Ionicons}
      />

      <FlatButton
        title="Word List"
        color="#457B9D" // lighter navy button
        onPress={() => navigation.navigate('Word List')}
        icon="list"
        iconLibrary={MaterialIcons}
      />
    </View>
  );
}

// Main App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
        name="Add Word"
        component={AddWordScreen}
        options={{
        headerStyle: {
        backgroundColor: '#000', // black background
      },
        headerTintColor: '#fff', // icons and back button color
        headerTitleStyle: {
        color: '#fff', // title text color
    },
  }}
/>
        <Stack.Screen name="Search Word" component={SearchWordScreen}
        options={{
        headerStyle: {
        backgroundColor: '#000', // black background
      },
        headerTintColor: '#fff', // icons and back button color
        headerTitleStyle: {
        color: '#fff', // title text color
    },
  }} />
        <Stack.Screen name="Word List" component={WordListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0A1F44', // dark navy like your screenshot
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff', // white title
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    paddingVertical: 14,
    borderRadius: 12,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
