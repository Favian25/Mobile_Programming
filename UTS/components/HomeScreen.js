// components/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Backpacker Kawah Ijen</Text>
          <Text style={styles.paragraph}>Selamat datang! Temukan kamar nyaman dan hemat untuk petualanganmu.</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  card: { padding: 16, borderRadius: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  paragraph: { fontSize: 16, color: '#555' },
});
