import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { products } from '../../../data/products';

const { height } = Dimensions.get('window');

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Товар не знайдено</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: '',
          headerTransparent: true,
          headerTintColor: '#fff',
        }} 
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.imageOverlay} />
        </View>
        
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.category}>Електроніка</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${product.price}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Про товар</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View style={styles.specsContainer}>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Доставка</Text>
              <Text style={styles.specValue}>Безкоштовно</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Гарантія</Text>
              <Text style={styles.specValue}>12 місяців</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Додати у кошик</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#64748b',
  },
  imageContainer: {
    width: '100%',
    height: height * 0.45,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  content: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  priceContainer: {
    backgroundColor: '#f5f3ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  price: {
    fontSize: 22,
    color: '#8b5cf6',
    fontWeight: '800',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#64748b',
  },
  specsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 20,
  },
  specItem: {
    alignItems: 'center',
    flex: 1,
  },
  specLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
  },
  specValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  footer: {
    padding: 24,
    paddingBottom: 34,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  buyButton: {
    backgroundColor: '#8b5cf6',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

