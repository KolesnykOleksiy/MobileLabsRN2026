import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { fileSystemService } from '../services/fileSystemService';

const FileInfoScreen = ({ route, navigation }) => {
  const { path, name } = route.params;
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: 'File Details' });
    loadInfo();
  }, [path]);

  const loadInfo = async () => {
    try {
      const result = await fileSystemService.getFileInfo(path);
      setInfo(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes) => {
    if (!bytes && bytes !== 0) return 'N/A';
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleString();
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#6366f1" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{name}</Text>
        </View>
        <InfoRow label="Type" value={info.isDirectory ? 'Folder' : `.${info.extension} File`} />
        <InfoRow label="Size" value={formatSize(info.size)} />
        <InfoRow label="Modified" value={formatDate(info.modificationTime)} />
        <InfoRow label="Path" value={info.uri.replace('file://', '')} />
      </View>
    </View>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value} numberOfLines={3}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loader: {
    marginTop: 50,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  row: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: '#334155',
    fontWeight: '500',
    lineHeight: 22,
  }
});

export default FileInfoScreen;
