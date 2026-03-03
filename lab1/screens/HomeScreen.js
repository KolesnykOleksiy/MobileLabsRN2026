import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, SafeAreaView } from 'react-native';
import logo from'../assets/logo.png';

const NEWS_DATA = [
  { id: '1', title: 'Аспіранти кафедри екології та природоохоронних технологій долучилися до відкритої лекції Міжнародної докторської школи INTENSE', date: '03.03.2026', text: 'Захід відбувся 19 лютого 2026 року у форматі онлайн (Zoom). Спікером виступила Ірина Шпаківська, PhD, старший науковий співробітник з екології Інституту екології Карпат Національної академії наук України.' },
  { id: '2', title: 'Представники університету долучилися до Дня спільнодії у межах програми «Ти як?»', date: '02.03.2026', text: '25 лютого на базі Житомирського обласного інституту післядипломної педагогічної освіти відбувся День спільнодії «ЗВО + сервіси “Ти як?”: від теорії до практики», організований у межах всеукраїнської програми ментального здоров’я «Ти як?», ініційованої Першою леді України Оленою Зеленською.' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
      <Image source={logo} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
        <Text style={styles.universityText}>ЖИТОМИРСЬКА ПОЛІТЕХНІКА</Text>
        <Text style={styles.appTitle}>FirstMobileApp</Text>
      </View>

      <FlatList
        data={NEWS_DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDate}>{item.date}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Колесник Олексій, група ВТ-22-2</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 15, alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' },
  universityText: { color: '#0055aa', fontWeight: 'bold', textAlign: 'center' },
  appTitle: { fontSize: 18, fontWeight: '600' },
  newsItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  newsTitle: { fontWeight: 'bold', fontSize: 16 },
  newsDate: { color: 'gray', fontSize: 12, marginVertical: 4 },
  footer: { padding: 10, backgroundColor: '#f9f9f9', alignItems: 'center' },
  footerText: { fontSize: 12, color: '#666' }
});