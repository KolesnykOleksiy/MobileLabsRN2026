import React from 'react';
import { StyleSheet, View, Text, SectionList } from 'react-native';

const CONTACTS_DATA = [
  {
    title: 'A',
    data: ['Andrew', 'Alice', 'Alex'],
  },
  {
    title: 'B',
    data: ['Bob', 'Ben'],
  },
  {
    title: 'C',
    data: ['Charlie', 'Catherine', 'Chris'],
  },
  {
    title: 'D',
    data: ['David', 'Diana'],
  },
];

const ContactsScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <SectionList
        sections={CONTACTS_DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    padding: 15,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 16,
  },
  header: {
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 15,
  },
});

export default ContactsScreen;
