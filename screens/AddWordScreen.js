import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import axios from 'axios';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function AddWordScreen({ navigation }) {
  const [english, setEnglish] = useState('');
  const [hindi, setHindi] = useState('');
  const [punjabi, setPunjabi] = useState('');

  // Header buttons
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Search Word')}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="search" size={24} color="#42A5F5" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Word List')}>
            <MaterialIcons name="list" size={24} color="#7E57C2" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const handleSave = async () => {
    if (!english || !hindi || !punjabi) {
      Alert.alert('Please fill all fields');
      return;
    }

    try {
      await axios.post('https://glossary-backend-0fjk.onrender.com/api/words/add', {
        english,
        hindi,
        punjabi,
      });
      Alert.alert('✅ Word saved!');
      setEnglish('');
      setHindi('');
      setPunjabi('');
    } catch (error) {
      console.error(error);
      Alert.alert('❌ Failed to save word');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Add New Word</Text>

        <TextInput
          placeholder="English Word"
          value={english}
          onChangeText={setEnglish}
          style={styles.input}
        />
        <TextInput
          placeholder="Hindi Meaning"
          value={hindi}
          onChangeText={setHindi}
          style={styles.input}
        />
        <TextInput
          placeholder="Punjabi Meaning"
          value={punjabi}
          onChangeText={setPunjabi}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={handleSave}
          activeOpacity={0.85}
          style={[styles.saveButton, styles.shadow]}
        >
          <Ionicons
            name="save-outline"
            size={22}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.saveText}>Save Word</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7', // light neutral background like in screenshot
    justifyContent: 'top',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#FAFAFA',
    padding: 12,
    marginBottom: 18,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#42A5F5', // modern blue accent
    paddingVertical: 14,
    borderRadius: 10,
  },
  saveText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
