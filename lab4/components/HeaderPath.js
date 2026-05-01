import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HeaderPath = ({ path, onBack }) => {
  const pathParts = path.split('/').filter(p => p !== '');
  
  return (
    <View style={styles.container}>
      {path !== '' && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#6366f1" />
        </TouchableOpacity>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.partWrapper}>
          <Text style={styles.rootText}>Root</Text>
        </View>
        {pathParts.map((part, index) => (
          <React.Fragment key={index}>
            <Ionicons name="chevron-forward" size={14} color="#cbd5e1" style={styles.separator} />
            <View style={styles.partWrapper}>
              <Text style={styles.partText}>{part}</Text>
            </View>
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    marginRight: 12,
    backgroundColor: '#f5f3ff',
    padding: 6,
    borderRadius: 8,
  },
  scrollContent: {
    alignItems: 'center',
  },
  partWrapper: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rootText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
  partText: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },
  separator: {
    marginHorizontal: 4,
  }
});

export default HeaderPath;
