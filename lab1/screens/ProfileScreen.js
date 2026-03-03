import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.title}>Реєстрація</Text>

        <Text>Електронна пошта</Text>
        <TextInput style={styles.input} placeholder="example@mail.com" />

        <Text>Пароль</Text>
        <TextInput style={styles.input} secureTextEntry={true} />

        <Text>Пароль (ще раз)</Text>
        <TextInput style={styles.input} secureTextEntry={true} />

        <Text>Прізвище</Text>
        <TextInput style={styles.input} />

        <Text>Ім'я</Text>
        <TextInput style={styles.input} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Зареєструватися</Text>
        </TouchableOpacity>
      </ScrollView>


      <View style={styles.footer}>
        <Text style={styles.footerText}>Колесник Олексій, група ВТ-22-2</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  form: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 15 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  footer: { padding: 10, backgroundColor: '#f9f9f9', alignItems: 'center' },
  footerText: { fontSize: 12, color: '#666' }
});