import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FileItem = ({ item, onPress, onLongPress, onInfoPress }) => {
  const iconName = item.isDirectory ? 'folder' : 'document-text';
  const iconColor = item.isDirectory ? '#fbbf24' : '#6366f1';

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(item)}
      onLongPress={() => onLongPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View style={[styles.iconWrapper, { backgroundColor: item.isDirectory ? '#fffbeb' : '#eef2ff' }]}>
          <Ionicons name={iconName} size={24} color={iconColor} />
        </View>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      </View>
      <TouchableOpacity onPress={() => onInfoPress(item)} style={styles.infoButton}>
        <Ionicons name="information-circle-outline" size={22} color="#94a3b8" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#334155',
  },
  infoButton: {
    padding: 8,
  }
});

export default FileItem;
