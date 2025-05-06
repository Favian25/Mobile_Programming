import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const rooms = [
  { title: 'Standard Room', desc: 'Kamar sederhana dengan kipas angin.', icon: 'bed' },
  { title: 'Deluxe Room', desc: 'Kamar dengan AC dan kamar mandi dalam.', icon: 'king-bed' },
  { title: 'Shared Dormitory', desc: 'Tempat tidur susun, cocok untuk backpacker.', icon: 'hotel' },
];

export default function RoomScreen() {
  return (
    <ScrollView style={styles.container}>
      {rooms.map((room, index) => (
        <Card key={index} style={styles.card}>
          <Card.Title
            title={room.title}
            left={() => <MaterialIcons name={room.icon} size={32} />}
          />
          <Card.Content>
            <Paragraph>{room.desc}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 16, borderRadius: 10 },
});
