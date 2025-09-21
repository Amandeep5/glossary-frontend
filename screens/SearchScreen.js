import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await axios.get(`https://glossary-backend-0fjk.onrender.com/api/words/search/${query}`);
      setResult(res.data || null);
    } catch (error) {
      console.error(error);
      Alert.alert('Search failed');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter English Word"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button title="Search" onPress={handleSearch} />
      {result ? (
        <View style={styles.result}>
          <Text>Hindi: {result.hindi}</Text>
          <Text>Punjabi: {result.punjabi}</Text>
        </View>
      ) : (
        <Text style={styles.noResult}>No result found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
  },
  result: { marginTop: 20 },
  noResult: { marginTop: 20, color: 'gray' },
});
