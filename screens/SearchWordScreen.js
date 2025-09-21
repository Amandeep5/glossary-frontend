import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

export default function SearchWordScreen() {
  const [english, setEnglish] = useState('');
  const [result, setResult] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedWord, setEditedWord] = useState({ english: '', hindi: '', punjabi: '' });

  const handleSearch = async () => {
    if (!english) {
      Alert.alert('Please enter a word to search');
      return;
    }
    try {
      const res = await axios.get(`https://glossary-backend-0fjk.onrender.com/api/words/search/${english}`);
      setResult(res.data);
      setEditedWord(res.data);
      setIsEditing(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('The word does not exist yet!');
        setResult(null);
        setIsEditing(false);
      } else {
        Alert.alert('Search Failed', error.message);
        setResult(null);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://glossary-backend-0fjk.onrender.com/api/words/${result._id}`);
      Alert.alert('Deleted', 'Word deleted successfully!');
      setResult(null);
      setEnglish('');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete word');
    }
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(`https://glossary-backend-0fjk.onrender.com/api/words/${result._id}`, editedWord);
      setResult(res.data);
      setIsEditing(false);
      Alert.alert('Updated', 'Word updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update word');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <Text style={styles.title}>Search Word</Text>
      <TextInput
        placeholder="Enter English Word"
        value={english}
        onChangeText={setEnglish}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {result && !isEditing && (
        <View style={styles.card}>
          <Text style={styles.wordText}>English: {result.english}</Text>
          <Text style={styles.wordText}>Hindi: {result.hindi}</Text>
          <Text style={styles.wordText}>Punjabi: {result.punjabi}</Text>

          <View style={styles.actions}>
            <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => setIsEditing(true)}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {result && isEditing && (
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            value={editedWord.english}
            onChangeText={(text) => setEditedWord({ ...editedWord, english: text })}
          />
          <TextInput
            style={styles.input}
            value={editedWord.hindi}
            onChangeText={(text) => setEditedWord({ ...editedWord, hindi: text })}
          />
          <TextInput
            style={styles.input}
            value={editedWord.punjabi}
            onChangeText={(text) => setEditedWord({ ...editedWord, punjabi: text })}
          />

          <View style={styles.actions}>
            <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={handleSaveEdit}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={() => setIsEditing(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  wordText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  editButton: { backgroundColor: '#F5A623' },
  deleteButton: { backgroundColor: '#D0021B' },
  saveButton: { backgroundColor: '#7ED321' },
  cancelButton: { backgroundColor: '#9B9B9B' },
});
