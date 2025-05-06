import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';

export default function BookingScreen() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [date, setDate] = useState('');

  const handleBooking = () => {
    alert(`Booking untuk ${name}, kamar ${room}, tanggal ${date}`);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Form Booking</Title>
      <TextInput
        label="Nama Lengkap"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Tipe Kamar"
        value={room}
        onChangeText={setRoom}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Tanggal (dd-mm-yyyy)"
        value={date}
        onChangeText={setDate}
        mode="outlined"
        placeholder="Contoh: 10-05-2025"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleBooking} style={styles.button}>
        Booking Sekarang
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { marginBottom: 20, textAlign: 'center' },
  input: { marginBottom: 16 },
  button: { marginTop: 10 },
});
