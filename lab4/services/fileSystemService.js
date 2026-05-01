import * as FileSystem from 'expo-file-system/legacy';
import { Alert } from 'react-native';

const docDir = FileSystem.documentDirectory;

export const fileSystemService = {
  getDirectoryContent: async (path = '') => {
    try {
      const fullPath = `${docDir}${path}`;
      

      const dirInfo = await FileSystem.getInfoAsync(fullPath);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(fullPath, { intermediates: true });
      }

      const files = await FileSystem.readDirectoryAsync(fullPath);
      
      const details = await Promise.all(
        files.map(async (fileName) => {
          const itemPath = `${fullPath}${fileName}`;
          const info = await FileSystem.getInfoAsync(itemPath);
          return {
            name: fileName,
            uri: info.uri || itemPath,
            isDirectory: info.isDirectory,
            size: info.size || 0,
            modificationTime: info.modificationTime || Date.now() / 1000,
          };
        })
      );
      
      return details.sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      });
    } catch (error) {
      console.error('Error reading directory:', error);
      return []; // Повертаємо порожній список замість помилки
    }
  },

  createFolder: async (path, folderName) => {
    try {
      const fullPath = `${docDir}${path}${folderName}/`;
      await FileSystem.makeDirectoryAsync(fullPath, { intermediates: true });
    } catch (error) {
      Alert.alert('Error', 'Could not create folder');
      throw error;
    }
  },

  createFile: async (path, fileName, content = '') => {
    try {
      const fullPath = `${docDir}${path}${fileName}`;
      await FileSystem.writeAsStringAsync(fullPath, content, { encoding: FileSystem.EncodingType.UTF8 });
    } catch (error) {
      Alert.alert('Error', 'Could not create file');
      throw error;
    }
  },

  readFile: async (path) => {
    try {
      const fullPath = `${docDir}${path}`;
      return await FileSystem.readAsStringAsync(fullPath, { encoding: FileSystem.EncodingType.UTF8 });
    } catch (error) {
      Alert.alert('Error', 'Could not read file');
      throw error;
    }
  },

  saveFile: async (path, content) => {
    try {
      const fullPath = `${docDir}${path}`;
      await FileSystem.writeAsStringAsync(fullPath, content, { encoding: FileSystem.EncodingType.UTF8 });
    } catch (error) {
      Alert.alert('Error', 'Could not save file');
      throw error;
    }
  },

  deleteItem: async (path) => {
    try {
      const fullPath = `${docDir}${path}`;
      await FileSystem.deleteAsync(fullPath);
    } catch (error) {
      Alert.alert('Error', 'Could not delete item');
      throw error;
    }
  },

  getDiskInfo: async () => {
    try {
      const free = await FileSystem.getFreeDiskStorageAsync();
      const total = await FileSystem.getTotalDiskCapacityAsync();
      return {
        free: free || 0,
        total: total || 0,
        used: (total - free) || 0,
      };
    } catch (error) {
      console.error('Error getting disk info:', error);
      return { free: 0, total: 0, used: 0 };
    }
  },

  getFileInfo: async (path) => {
    try {
      const fullPath = `${docDir}${path}`;
      const info = await FileSystem.getInfoAsync(fullPath);
      return {
        ...info,
        uri: info.uri || fullPath,
        extension: path.split('.').pop() || 'folder',
        path: path
      };
    } catch (error) {
      Alert.alert('Error', 'Could not get file info');
      throw error;
    }
  }
};
