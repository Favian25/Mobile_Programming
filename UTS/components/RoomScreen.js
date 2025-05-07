import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const rooms = [
  {
    title: 'Dormitory Room',
    price: 'Rp 60.000/malam',
    capacity: '1 tamu',
    facilities: 'Fan, Wi-Fi, shared bathroom',
    image: require('../assets/dormitory.jpg')
  },
  {
    title: 'Basic Fan Room',
    price: 'Rp 125.000/malam',
    capacity: '2 tamu',
    facilities: 'Fan, Wi-Fi, shared bathroom, king bed',
    image: require('../assets/basic.jpg')
  },
  {
    title: 'Twin Room',
    price: 'Rp 150.000/malam',
    capacity: '2 tamu',
    facilities: 'AC, Wi-Fi, private bathroom, 2 beds',
    image: require('../assets/twin.jpg')
  },
  {
    title: 'Standard Room',
    price: 'Rp 170.000/malam',
    capacity: '2 tamu',
    facilities: 'AC, Wi-Fi, private bathroom, TV',
    image: require('../assets/standard.jpg')
  },
  {
    title: 'Deluxe Room',
    price: 'Rp 200.000/malam',
    capacity: '2 tamu',
    facilities: 'AC, Wi-Fi, private bathroom, TV, balcony',
    image: require('../assets/deluxe.jpg')
  },
  {
    title: 'Superior Room',
    price: 'Rp 250.000/malam',
    capacity: '2 tamu',
    facilities: 'AC, Wi-Fi, private bathroom, TV, balcony, sofa',
    image: require('../assets/superior.jpg')
  },
];

export default function RoomScreen() {
  const navigation = useNavigation();
  const [cardWidth, setCardWidth] = useState('100%');

  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = Dimensions.get('window').width;
      if (screenWidth > 768) {
        setCardWidth('32%');
      } else {
        setCardWidth('100%');
      }
    };

    updateLayout();
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.header}>Tipe Kamar yang Tersedia</Text>
      <View style={styles.grid}>
        {rooms.map((room, index) => (
          <Card key={index} style={[styles.card, { width: cardWidth }]}>
            <Card.Cover source={room.image} style={styles.image} />
            <Card.Content>
              <Text style={styles.title}>{room.title}</Text>
              <Text style={styles.text}>{room.price}</Text>
              <Text style={styles.text}>Kapasitas: {room.capacity}</Text>
              <Text style={styles.text}>Fasilitas: {room.facilities}</Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" buttonColor="#1ba0e3" textColor="#fff" onPress={() => navigation.navigate('Booking')}>
                Book Now
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
          </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#333'
  },
  container: {
    flex: 1,
    padding: 8,
    paddingBottom: 24,
    backgroundColor: '#fff',},
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    // width handled dynamically
    marginBottom: 24,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  text: {
    fontSize: 12,
    marginVertical: 2,
  },
});
