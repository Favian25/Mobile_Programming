import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export default function App() {
  const [bookings, setBookings] = useState([]);
  const [nama, setNama] = useState('');
  const [category, setCategory] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editNama, setEditNama] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editCheckIn, setEditCheckIn] = useState('');
  const [editCheckOut, setEditCheckOut] = useState('');

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/bookings`);
      setBookings(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const addBooking = async () => {
    if (!nama || !category || !checkIn || !checkOut) {
      Alert.alert("Harap isi semua data!");
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/bookings`, { nama, category, checkIn, checkOut });
      setBookings([...bookings, res.data]);
      setNama('');
      setCategory('');
      setCheckIn('');
      setCheckOut('');
    } catch (err) {
      console.error('Add error:', err);
    }
  };

  const editBooking = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/bookings/${id}`, {
        nama: editNama,
        category: editCategory,
        checkIn: editCheckIn,
        checkOut: editCheckOut,
      });
      setBookings(bookings.map(b => (b._id === id ? res.data : b)));
      cancelEdit();
    } catch (err) {
      console.error('Edit error:', err);
    }
  };

  const deleteBooking = (id) => {
    Alert.alert("Hapus?", "Yakin ingin menghapus pemesanan ini?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/bookings/${id}`);
            setBookings(bookings.filter(b => b._id !== id));
          } catch (err) {
            console.error('Delete error:', err);
          }
        },
      },
    ]);
  };

  const startEdit = (b) => {
    setEditingId(b._id);
    setEditNama(b.nama);
    setEditCategory(b.category);
    setEditCheckIn(b.checkIn);
    setEditCheckOut(b.checkOut);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditNama('');
    setEditCategory('');
    setEditCheckIn('');
    setEditCheckOut('');
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const renderPicker = (value, onChange) => (
    <Picker
      selectedValue={value}
      onValueChange={onChange}
      style={styles.input}
    >
      <Picker.Item label="Pilih Tipe Kamar" value="" enabled={false} />
      <Picker.Item label="Standard Room" value="Standard Room" />
      <Picker.Item label="Basic Room" value="Basic Room" />
      <Picker.Item label="Family Room" value="Family Room" />
      <Picker.Item label="Dormitory" value="Dormitory" />
    </Picker>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.header}>🏠 Booking Homestay</Title>

      {/* Tambah Booking */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.subTitle}>Tambah Pemesanan</Title>
          <TextInput placeholder="Nama" value={nama} onChangeText={setNama} style={styles.input} />
          {renderPicker(category, setCategory)}
          <TextInput placeholder="Check In (DD-MM-YYYY)" value={checkIn} onChangeText={setCheckIn} style={styles.input} />
          <TextInput placeholder="Check Out (DD-MM-YYYY)" value={checkOut} onChangeText={setCheckOut} style={styles.input} />
          <View style={styles.buttonContainer}>
            <Button title="Tambah" onPress={addBooking} color="#1E90FF" />
          </View>
        </Card.Content>
      </Card>

      {/* Edit Booking */}
      {editingId && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.subTitle}>Edit Pemesanan</Title>
            <TextInput placeholder="Nama" value={editNama} onChangeText={setEditNama} style={styles.input} />
            {renderPicker(editCategory, setEditCategory)}
            <TextInput placeholder="Check In (DD-MM-YYYY)" value={editCheckIn} onChangeText={setEditCheckIn} style={styles.input} />
            <TextInput placeholder="Check Out (DD-MM-YYYY)" value={editCheckOut} onChangeText={setEditCheckOut} style={styles.input} />
            <View style={styles.buttonRow}>
              <View style={styles.buttonContainer}>
                <Button title="Simpan" onPress={() => editBooking(editingId)} color="#32CD32" />
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Batal" onPress={cancelEdit} color="#FF6347" />
              </View>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Daftar Booking */}
      {bookings.map((b) => (
        <Card key={b._id} style={styles.card}>
          <Card.Content>
            <Title>{b.nama}</Title>
            <Paragraph>Tipe: {b.category}</Paragraph>
            <Paragraph>Check In: {b.checkIn}</Paragraph>
            <Paragraph>Check Out: {b.checkOut}</Paragraph>
            <View style={styles.buttonRow}>
              <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={() => startEdit(b)} color="#FFA500" />
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Delete" onPress={() => deleteBooking(b._id)} color="#DC143C" />
              </View>
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  header: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle: {
    marginBottom: 10,
  },
  card: {
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#ffffff',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fdfdfd',
  },
  buttonContainer: {
    marginVertical: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
});
