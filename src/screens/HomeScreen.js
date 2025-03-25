import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
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
    { image: require('../../assets/Email.png'), screen: 'EmailScreen'},
    { image: require('../../assets/Food.png'), screen: 'WebView', url: 'https://food.gold.ac.uk' },
    { image: require('../../assets/Travel.png'), screen: 'WebView', url: 'https://transport.gold.ac.uk' },
    { image: require('../../assets/Wellbeing.png'), screen: 'WebView', url: 'https://www.gold.ac.uk/students/wellbeing/wellbeing-service/' },
  ];

  const { width } = Dimensions.get('window');//Get screen width
  const itemWidth = (width / 2) - 30; //Dynamic width for better spacing

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        numColumns={3}
        keyExtractor={(item) => item.title}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <GridItem 
            title={item.title} 
            image={item.image}
            style={{ width: itemWidth }}
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
    backgroundColor: '#257f66',
    paddingTop: 50,
  },
  gridContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});

export default HomeScreen;
