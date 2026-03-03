import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const photoSize = (width - 40) / 2;

export default function GalleryScreen() {

  const photos = [
    { id: '1', src: require('../assets/photo1.png') },
    { id: '2', src: require('../assets/photo2.jpg') },
    { id: '3', src: require('../assets/photo3.jpg') },
    { id: '4', src: require('../assets/photo4.jpg') },
    { id: '5', src: require('../assets/photo5.jpeg') },
    { id: '6', src: require('../assets/photo6.jpg') },
    { id: '7', src: require('../assets/photo7.jpg') },
    { id: '8', src: require('../assets/photo8.jpeg') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        {photos.map((item) => (
          <View key={item.id} style={styles.photoContainer}>
            <Image
              source={item.src}
              style={styles.photo}
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Колесник Олексій, група ВТ-22-2</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10
  },
  photoContainer: {
    width: photoSize,
    height: photoSize,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  footer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  footerText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500'
  }
});