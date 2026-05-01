import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { fileSystemService } from '../services/fileSystemService';

const FileViewerScreen = ({ route, navigation }) => {
  const { path, name } = route.params;
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: name });
    loadFile();
  }, [path, name]);

  const loadFile = async () => {
    try {
      const text = await fileSystemService.readFile(path);
      setContent(text);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fileSystemService.saveFile(path, content);
      Alert.alert('Success', 'File saved successfully');
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#6366f1" style={styles.loader} />;
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TextInput
        style={styles.input}
        multiline
        value={content}
        onChangeText={setContent}
        textAlignVertical="top"
        placeholder="Start typing..."
      />
      <TouchableOpacity 
        style={[styles.saveButton, saving && { opacity: 0.7 }]} 
        onPress={handleSave}
        disabled={saving}
        activeOpacity={0.8}
      >
        <Text style={styles.saveButtonText}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  loader: {
    marginTop: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    color: '#334155',
    lineHeight: 24,
  },
  saveButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: Platform.OS === 'ios' ? 24 : 16,
    elevation: 4,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  }
});

export default FileViewerScreen;
