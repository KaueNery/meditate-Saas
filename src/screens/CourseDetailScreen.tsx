import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';

const CourseDetailScreen = ({ route }) => {
  const { course } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const renderSession = ({ item }) => (
    <TouchableOpacity 
      style={styles.sessionItem}
      onPress={() => navigation.navigate('Detail', { meditation: item })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.sessionImage} 
      />
      <View style={styles.sessionInfo}>
        <Text style={styles.sessionTitle}>{item.title}</Text>
        <Text style={styles.sessionDescription}>{item.description}</Text>
        <Text style={styles.sessionDuration}>{item.duration} mins</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.courseTitle}>{course.title}</Text>
      <Text style={styles.courseDescription}>{course.description}</Text>
      <FlatList
        data={course.sessions}
        renderItem={renderSession}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4ED',
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2D3436',
  },
  courseDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: '#636E72',
  },
  listContent: {
    paddingBottom: 20,
  },
  sessionItem: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2,
  },
  sessionImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  sessionInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  sessionDescription: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 4,
  },
  sessionDuration: {
    fontSize: 12,
    color: '#74B9FF',
    fontWeight: '500',
  },
});

export default CourseDetailScreen;