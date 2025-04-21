import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, Switch, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';


export default function App() {
  const [id, setId] = useState('');
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [pengirim, setPengirim] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [penerima, setPenerima] = useState('');
  const [savedDataList, setSavedDataList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('formData');
        if (savedData !== null) {
          const data = JSON.parse(savedData);
          setId(data.id);
          setNama(data.nama);
          setAlamat(data.alamat);
          setPengirim(data.pengirim);
          setJumlah(data.jumlah);
          setTanggal(data.tanggal);
          setPenerima(data.penerima);
        }

        const allData = await AsyncStorage.getItem('allData');
        if (allData !== null) {
          setSavedDataList(JSON.parse(allData));
        }
      } catch (e) {
        console.log('Gagal memuat data', e);
      }
    };
    loadData();
  }, []);

  const submitData = async () => {
    const data = {
      id,
      nama,
      alamat,
      pengirim,
      jumlah,
      tanggal,
      penerima,
    };

    try {
      await AsyncStorage.setItem('formData', JSON.stringify(data));

      const updatedList = [...savedDataList, data];
      await AsyncStorage.setItem('allData', JSON.stringify(updatedList));
      setSavedDataList(updatedList);

      Alert.alert('Data Tersimpan!', `Id: ${id}\nNama: ${nama}\nAlamat: ${alamat}\nPengirim: ${pengirim}\nJumlah: ${jumlah}\nTanggal: ${tanggal}\nPenerima: ${penerima}`);
    } catch (e) {
      Alert.alert('Gagal menyimpan data!');
    }
  };

  const editData = (index) => {
    const dataToEdit = savedDataList[index];
    setId(dataToEdit.id);
    setNama(dataToEdit.nama);
    setAlamat(dataToEdit.alamat);
    setPengirim(dataToEdit.pengirim);
    setJumlah(dataToEdit.jumlah);
    setTanggal(dataToEdit.tanggal);
    setPenerima(dataToEdit.penerima);

    const updatedList = savedDataList.filter((_, i) => i !== index);
    setSavedDataList(updatedList);
    AsyncStorage.setItem('allData', JSON.stringify(updatedList));
  };

  const deleteData = async (index) => {
    const updatedList = savedDataList.filter((_, i) => i !== index);
    setSavedDataList(updatedList);
    await AsyncStorage.setItem('allData', JSON.stringify(updatedList));
    Alert.alert('Data berhasil dihapus!');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Form Input Data Barang</Text>

        <Text style={styles.label}>ID Barang</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan ID"
          value={id}
          onChangeText={setId}
        />

        <Text style={styles.label}>Nama Barang</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Nama Barang"
          value={nama}
          onChangeText={setNama}
        />

        <Text style={styles.label}>Alamat Tujuan</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Alamat"
          value={alamat}
          onChangeText={setAlamat}
          multiline
          height={300}
        />

        <Text style={styles.label}>Pengirim</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={pengirim}
            onValueChange={(itemValue) => setPengirim(itemValue)}
          >
            <Picker.Item label="Pilih Pengirim" value="" />
            <Picker.Item label="Favian" value="Favian" />
            <Picker.Item label="Lukman" value="Lukman" />
            <Picker.Item label="Farrel" value="Farrel" />
            <Picker.Item label="Sholeh" value="Sholeh" />
          </Picker>
        </View>

        <Text style={styles.label}>Jumlah Barang: {jumlah}</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={jumlah}
          onValueChange={(value) => setJumlah(value)}
          minimumTrackTintColor="#3399ff"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#3399ff"
        />

        <Text style={styles.label}>Tanggal Kirim</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Tanggal Kirim"
          value={tanggal}
          onChangeText={setTanggal}
        />

        <Text style={styles.label}>Penerima</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Penerima"
          value={penerima}
          onChangeText={setPenerima}
        />

        <View style={{ marginTop: 20 }}>
          <Button title="Simpan ke Local Storage" onPress={submitData} />
        </View>

        <Text style={[styles.label, { marginTop: 30 }]}>Daftar Data Tersimpan:</Text>
        <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 5 }}>
        <View style={[styles.savedItem, { flexDirection: 'row', backgroundColor: '#f0f0f0' }]}>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>ID</Text>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Nama</Text>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Alamat</Text>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Pengirim</Text>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Jumlah</Text>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Tanggal</Text>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Penerima</Text>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Aksi</Text>
        </View>
        </View>
        {savedDataList.map((item, index) => (
        <View key={index} style={[styles.savedItem, { flexDirection: 'row' }]}>
          <Text style={{ flex: 1 }}>{item.id}</Text>
          <Text style={{ flex: 1 }}>{item.nama}</Text>
          <Text style={{ flex: 1 }}>{item.alamat}</Text>
          <Text style={{ flex: 1 }}>{item.pengirim}</Text>
          <Text style={{ flex: 1 }}>{item.jumlah}</Text>
          <Text style={{ flex: 1 }}>{item.tanggal}</Text>
          <Text style={{ flex: 1 }}>{item.penerima}</Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity style={styles.editButton} onPress={() => editData(index)}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteData(index)}>
              <Text style={styles.buttonText}>Hapus</Text>
            </TouchableOpacity>
          </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#3399ff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 2,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  savedItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginVertical: 5,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  listHeader: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    paddingVertical: 10,
    marginTop: 10,
  },
  listHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  listText: {
    flex: 1,
    textAlign: 'center',
  },
  actionButtons: {
    flex: 1,
    justifyContent: 'space-around',
  },
});