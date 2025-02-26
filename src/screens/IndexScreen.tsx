import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import Carousel from 'react-native-snap-carousel-v4';
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { getSessions, getCourses } from '../services/api';
import { MeditationItem, CourseItem, RootStackParamList } from '../types';
import type { NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    color: '#4A6572',
    marginBottom: 10,
    letterSpacing: 1.5,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    color: '#4A6572',
    marginVertical: 15,
  },
  carouselItem: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginHorizontal: 10,
  },
  carouselImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    justifyContent: 'flex-end',
  },
  carouselText: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFF',
    marginBottom: 5,
  },
  durationText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#EEE',
  },
  courseDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#DDD',
    lineHeight: 18,
  },
  sessionCount: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#CCC',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#FF4444',
    textAlign: 'center',
  },
});

const IndexScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [fontsLoaded] = useFonts({ Poppins_600SemiBold, Poppins_400Regular });
  const [singleSessionsData, setSingleSessionsData] = useState<MeditationItem[]>([]);
  const [coursesData, setCoursesData] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessions, courses] = await Promise.all([
          getSessions(),
          getCourses()
        ]);
        setSingleSessionsData(sessions);
        setCoursesData(courses);
      } catch (err) {
        setError('Failed to load content. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const renderSingleSessionItem = ({ item }: { item: MeditationItem }) => (
    <TouchableOpacity
      style={styles.carouselItem}
      onPress={() => navigation.navigate('Detail', { meditation: item })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.carouselImage} 
      />
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
        style={styles.gradientOverlay}
      >
        <Text style={styles.carouselText}>{item.title}</Text>
        <Text style={styles.durationText}>{item.duration} mins</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderCourseItem = ({ item }: { item: CourseItem }) => (
    <TouchableOpacity
      style={styles.carouselItem}
      onPress={() => navigation.navigate('CourseDetail', { course: item })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.carouselImage} 
      />
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
        style={styles.gradientOverlay}
      >
        <Text style={styles.carouselText}>{item.title}</Text>
        <Text style={styles.courseDescription}>{item.description}</Text>
        <Text style={styles.sessionCount}>{item.sessions.length} sessions</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A6572" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>SERENITY</Text>
      <Text style={styles.sectionSubtitle}>Single Sessions</Text>
      <Carousel
        data={singleSessionsData}
        renderItem={renderSingleSessionItem}
        sliderWidth={width}
        itemWidth={width * 0.75}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={0.7}
        loop
        autoplay
        autoplayInterval={3000}
      />
      <Text style={styles.sectionSubtitle}>Courses</Text>
      <Carousel
        data={coursesData}
        renderItem={renderCourseItem}
        sliderWidth={width}
        itemWidth={width * 0.75}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={0.7}
        loop
        autoplay
        autoplayInterval={3000}
      />
    </View>
  );
};

export default IndexScreen;