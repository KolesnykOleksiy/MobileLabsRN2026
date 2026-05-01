import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, Alert, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fileSystemService } from '../services/fileSystemService';
import FileItem from '../components/FileItem';
import HeaderPath from '../components/HeaderPath';
import CreateModal from '../components/CreateModal';

const HomeScreen = ({ navigation }) => {
  const [currentPath, setCurrentPath] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [diskInfo, setDiskInfo] = useState({ free: 0, total: 0, used: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [createType, setCreateType] = useState('folder');

  const loadDirectory = useCallback(async (path) => {
    setLoading(true);
    try {
      const content = await fileSystemService.getDirectoryContent(path);
      setItems(content);
      const info = await fileSystemService.getDiskInfo();
      setDiskInfo(info);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDirectory(currentPath);
  }, [currentPath, loadDirectory]);

  const handleItemPress = (item) => {
    if (item.isDirectory) {
      setCurrentPath(`${currentPath}${item.name}/`);
    } else if (item.name.endsWith('.txt')) {
      navigation.navigate('FileViewer', { path: `${currentPath}${item.name}`, name: item.name });
    } else {
      Alert.alert('Not Supported', 'Currently only .txt files can be viewed');
    }
  };

  const handleInfoPress = (item) => {
    navigation.navigate('FileInfo', { path: `${currentPath}${item.name}`, name: item.name });
  };

  const handleLongPress = (item) => {
    Alert.alert(
      'Delete',
      `Are you sure you want to delete ${item.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            await fileSystemService.deleteItem(`${currentPath}${item.name}`);
            loadDirectory(currentPath);
          }
        }
      ]
    );
  };

  const handleCreate = async (name, content) => {
    try {
      if (createType === 'folder') {
        await fileSystemService.createFolder(currentPath, name);
      } else {
        const fileName = name.endsWith('.txt') ? name : `${name}.txt`;
        await fileSystemService.createFile(currentPath, fileName, content);
      }
      loadDirectory(currentPath);
    } catch (error) {
      console.error(error);
    }
  };

  const formatSize = (bytes) => {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  };

  const goBack = () => {
    const parts = currentPath.split('/').filter(p => p !== '');
    parts.pop();
    setCurrentPath(parts.length > 0 ? parts.join('/') + '/' : '');
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total</Text>
          <Text style={styles.statValue}>{formatSize(diskInfo.total)}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Used</Text>
          <Text style={styles.statValue}>{formatSize(diskInfo.used)}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Free</Text>
          <Text style={styles.statValue}>{formatSize(diskInfo.free)}</Text>
        </View>
      </View>

      <HeaderPath path={currentPath} onBack={goBack} />

      {loading ? (
        <ActivityIndicator size="large" color="#6366f1" style={styles.loader} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <FileItem 
              item={item} 
              onPress={handleItemPress} 
              onLongPress={handleLongPress}
              onInfoPress={handleInfoPress}
            />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Empty Directory</Text>}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <View style={styles.fabContainer}>
        <TouchableOpacity 
          style={[styles.fab, { backgroundColor: '#10b981' }]} 
          onPress={() => { setCreateType('folder'); setModalVisible(true); }}
        >
          <Ionicons name="folder-outline" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.fab, { backgroundColor: '#6366f1' }]} 
          onPress={() => { setCreateType('file'); setModalVisible(true); }}
        >
          <Ionicons name="document-text-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <CreateModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onCreate={handleCreate}
        type={createType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f8fafc',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  statBox: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    minWidth: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
  },
  loader: {
    marginTop: 50,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 100,
    color: '#94a3b8',
    fontSize: 16,
  },
  fabContainer: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    flexDirection: 'column',
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 16,
  }
});

export default HomeScreen;
