import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookingScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [roomType, setRoomType] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      const stored = await AsyncStorage.getItem('bookings');
      if (stored) setBookings(JSON.parse(stored));
    };
    loadBookings();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleBooking = () => {
    if (!name || !phone || !email || !roomType || !checkIn || !checkOut) {
      Alert.alert('Lengkapi Data', 'Semua data harus diisi');
      return;
    }
    const newBooking = { id: Date.now(), name, phone, email, roomType, checkIn, checkOut };
    setBookings([...bookings, newBooking]);
    setName(''); setPhone(''); setEmail(''); setRoomType(''); setCheckIn(''); setCheckOut('');
  };

  const handleDelete = (id) => {
    Alert.alert('Konfirmasi', 'Yakin ingin menghapus data ini?', [
      { text: 'Batal' },
      { text: 'Hapus', onPress: async () => {
        const updated = bookings.filter(b => b.id !== id);
        setBookings(updated);
        await AsyncStorage.setItem('bookings', JSON.stringify(updated));
      }}
    ]);
  };

  const handleEdit = (booking) => {
    setName(booking.name);
    setPhone(booking.phone);
    setEmail(booking.email);
    setRoomType(booking.roomType);
    setCheckIn(booking.checkIn);
    setCheckOut(booking.checkOut);
    setBookings(bookings.filter(b => b.id !== booking.id));
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={styles.title}>Form Pemesanan Kamar</Text>
      <TextInput label="Nama Tamu" value={name}
        onChangeText={setName} mode="outlined"
        style={styles.input}
        theme={{ colors: { background: 'white', text: 'black' } }} />
      <TextInput label="No Telepon"
        value={phone} onChangeText={setPhone}
        mode="outlined"
        style={styles.input} keyboardType="phone-pad"
        theme={{ colors: { background: 'white', text: 'black', placeholder: '#444' } }} />
      <TextInput label="Email" value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input} keyboardType="email-address"
        theme={{ colors: { background: 'white', text: 'black', placeholder: '#444' } }} />

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Tipe Kamar</Text>
        <Picker selectedValue={roomType} onValueChange={(itemValue) => setRoomType(itemValue)}>
          <Picker.Item label="Pilih Tipe Kamar" value="" />
          <Picker.Item label="Dormitory Room" value="Dormitory Room" />
          <Picker.Item label="Basic Fan Room" value="Basic Fan Room" />
          <Picker.Item label="Twin Room" value="Twin Room" />
          <Picker.Item label="Standard Room" value="Standard Room" />
          <Picker.Item label="Deluxe Room" value="Deluxe Room" />
          <Picker.Item label="Superior Room" value="Superior Room" />
        </Picker>
      </View>

      <TextInput label="Tanggal Check-in (dd-mm-yyyy)" value={checkIn} onChangeText={setCheckIn} mode="outlined" style={styles.input} theme={{ colors: { background: 'white', text: 'black', placeholder: '#444' } }} />
      <TextInput label="Tanggal Check-out (dd-mm-yyyy)" value={checkOut} onChangeText={setCheckOut} mode="outlined" style={styles.input} theme={{ colors: { background: 'white', text: 'black', placeholder: '#444' } }} />

      <Button mode="contained" onPress={handleBooking} style={styles.button} labelStyle={{ color: 'white' }} buttonColor="#3399ff">
        Booking Sekarang
      </Button>

      <View style={styles.listContainer}>
        <Text style={styles.tableTitle}>Data Pemesanan</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.cell, styles.headerCell]}>Nama</Text>
          <Text style={[styles.cell, styles.headerCell]}>Telepon</Text>
          <Text style={[styles.cell, styles.headerCell]}>Email</Text>
          <Text style={[styles.cell, styles.headerCell]}>Tipe</Text>
          <Text style={[styles.cell, styles.headerCell]}>Check-in</Text>
          <Text style={[styles.cell, styles.headerCell]}>Check-out</Text>
          <Text style={[styles.cell, styles.headerCell]}>Aksi</Text>
        </View>
        {bookings.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={[styles.cell, styles.rowText]}>{item.name}</Text>
            <Text style={[styles.cell, styles.rowText]}>{item.phone}</Text>
            <Text style={[styles.cell, styles.rowText]}>{item.email}</Text>
            <Text style={[styles.cell, styles.rowText]}>{item.roomType}</Text>
            <Text style={[styles.cell, styles.rowText]}>{item.checkIn}</Text>
            <Text style={[styles.cell, styles.rowText]}>{item.checkOut}</Text>
            <View style={[styles.cell, { flexDirection: 'row' }]}>
              <Button compact mode="contained" onPress={() => handleEdit(item)} style={{ backgroundColor: '#3399ff', marginLeft: 4 }} labelStyle={{ color: 'white', fontWeight: 'bold' }}>Edit</Button>
              <Button compact mode="contained" onPress={() => handleDelete(item.id)} style={{ backgroundColor: 'red', marginLeft: 4 }} labelStyle={{ color: 'white', fontWeight: 'bold' }}>Hapus</Button>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginBottom: 16, textAlign: 'center', fontSize: 20, color: 'black', fontWeight: 'bold' },
  input: { marginBottom: 16 },
  button: { marginTop: 10 },
  pickerContainer: { marginBottom: 16, borderColor: '#999', borderWidth: 1, borderRadius: 5 },
  pickerLabel: { marginTop: 8, marginLeft: 12, fontSize: 14, fontWeight: 'bold', color: '#444' },
  listContainer: { marginTop: 24 },
  tableTitle: { marginBottom: 12, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'black' },
  tableHeader: { flexDirection: 'row', backgroundColor: '#e38410', paddingVertical: 6 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 6 },
  cell: { flex: 1, paddingHorizontal: 4, fontSize: 16 },
  headerCell: { fontWeight: 'bold', color: 'black' },
  rowText: { color: 'black' },
  smallButton: { marginLeft: 4 }
});
