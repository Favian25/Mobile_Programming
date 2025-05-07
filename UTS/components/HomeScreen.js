import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/header.jpg')}
        style={[styles.header, { width: screenWidth }]}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.headerText}>WELCOME TO BACKPACKER KAWAH IJEN</Text>
        </View>
      </ImageBackground>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Tentang Backpacker Kawah Ijen</Text>
          <Text style={styles.paragraph}>Backpacker Kawah Ijen Homestay & Dormitory merupakan akomodasi rekomendasi untuk Anda,
            seorang backpacker yang tidak hanya mengutamakan budget, tapi juga kenyamanan saat beristirahat setelah menempuh petualangan
            seharian penuh. Bagi Anda yang menginginkan kualitas pelayanan oke dengan harga yang ramah di kantong, Backpacker Kawah Ijen
            Homestay & Dormitory adalah pilihan yang tepat. Karena meski murah, akomodasi ini menyediakan fasilitas memadai dan pelayanan
            yang tetap terjaga mutunya.</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { height: 200, justifyContent: 'center' },
  imageStyle: { resizeMode: 'cover', opacity: 0.6 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  headerText: { color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 16 },
  card: { margin: 16, padding: 16, borderRadius: 10, backgroundColor: '#dedede' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  paragraph: { fontSize: 16, color: '#555', justifyContent: 'center', textAlign: 'justify' },
});
