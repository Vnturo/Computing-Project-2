import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import GridItem from '../components/GridItem';

const HomeScreen = ({ navigation }) => {
  const menuItems = [
    { image: require('../../assets/learngold.png'), screen: 'WebView', url: 'https://learn.gold.ac.uk' },
    { image: require('../../assets/Library.png'), screen: 'WebView', url: 'https://www.gold.ac.uk/library/' },
    { image: require('../../assets/CampusMap.png'), screen: 'CampusMap' },
    { image: require('../../assets/RoomFinder.png'), screen: 'WebView', url: 'https://roomfinder.gold.ac.uk' },
    { image: require('../../assets/StudentEssentials.png'), screen: 'WebView', url: 'https://student.gold.ac.uk' },
    { image: require('../../assets/Timetable.png'), screen: 'WebView', url: 'https://www.gold.ac.uk/students/timetable/' },
    { image: require('../../assets/Careers.png'), screen: 'WebView', url: 'https://www.gold.ac.uk/careers/' },
    { image: require('../../assets/Email.png'), screen: 'WebView', url: 'https://email.gold.ac.uk' },
    { image: require('../../assets/Food.png'), screen: 'WebView', url: 'https://food.gold.ac.uk' },
    { image: require('../../assets/Travel.png'), screen: 'WebView', url: 'https://transport.gold.ac.uk' },
    { image: require('../../assets/Wellbeing.png'), screen: 'WebView', url: 'https://www.gold.ac.uk/students/wellbeing/wellbeing-service/' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        numColumns={3}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <GridItem 
            title={item.title} 
            image={item.image} 
            onPress={() => {
              if (item.url) {
                navigation.navigate(item.screen, { url: item.url });
              } else {
                navigation.navigate(item.screen);
              }
            }} 
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#257f66',
    paddingTop: 50,
  },
});

export default HomeScreen;
