import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function WordListScreen() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await axios.get('https://glossary-backend-0fjk.onrender.com/api/words');
        setWords(res.data);
      } catch (error) {
        console.error('Error fetching words:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  // ✅ Sorting function
  const handleSort = () => {
    const sortedWords = [...words].sort((a, b) => a.english.localeCompare(b.english));
    setWords(sortedWords);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.word}>English: {item.english}</Text>
      <Text>Hindi: {item.hindi}</Text>
      <Text>Punjabi: {item.punjabi}</Text>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;

  return (
    <View style={{ flex: 1 }}>
      {/* Sort Button */}
      <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
        <Text style={styles.sortText}>Sort A–Z</Text>
      </TouchableOpacity>

      <FlatList
        data={words}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { padding: 20 },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  word: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  sortButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    margin: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  sortText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
