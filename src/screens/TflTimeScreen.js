import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; //do "npx expo install react-native-maps" in terminal if not already installed
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { TFL_KEY } from '../config';

const stops = [
    {id: "490000156O", name: "New Cross Gate Station (Stop O)", type:"bus", lat:51.47505104874106, lon:-0.03939208121668194 },
    {id: "490000156R", name: "New Cross Gate Station (Stop R)", type:"bus", lat:51.47523755596582, lon:-0.03924717847137459},
    {id: "490000156M", name: "New Cross Gate Station (Stop M)", type:"bus", lat:51.47487680459311, lon:-0.0410596182577707},
    {id: "490009689S", name: "Marquis of Granby (Stop S)", type:"bus", lat: 51.47587222618361, lon:-0.03458751011692969},
    {id: "490007276X", name: "Marquis of Granby (Stop X)", type:"bus", lat:51.47533257868042, lon:-0.035754499730054984},
    {id: "490007276Y", name: "Marquis of Granby (Stop Y)", type:"bus", lat:51.47518727790273, lon:-0.03552880338110909},
    {id: "910GNEWXGTE", name: "New Cross Gate Station (Overground)", type:"train", lat:51.47504099106352, lon:-0.04034050124945818},
    {id: "910GNWCRELL", name: "New Cross Station (Overground)", type:"train", lat:51.47632829369317, lon:-0.032304349886531206}
]

const TflTimeScreen = () => {
  const [groupedArrivals, setGroupedArrivals] = useState([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const fetchAllStops = async () => {
    let allData = []
    for (let stop of stops) {
      try {
        const res = await fetch(`https://api.tfl.gov.uk/StopPoint/${stop.id}/Arrivals?app_key=${TFL_KEY}`)
        const data = await res.json()
        const sorted = data.sort((a, b) => a.timeToStation - b.timeToStation)
        sorted.forEach(item => item.stopName = stop.name)
        allData = [...allData, ...sorted]
      } catch (err) {
        console.error(`Error with fetching data for ${stop.name}`, err)
      }
    }

    const groupedData = {}
    allData.forEach(item => {
      const stopName = item.stopName
      if (!groupedData[stopName]) {
        groupedData[stopName] = { stopName, arrivals: [] }
      }
      groupedData[stopName].arrivals.push(item)
    })

    const groupedArray = Object.values(groupedData)
    setGroupedArrivals(groupedArray)
    setLoading(false)
  }

  useEffect(() => {
    fetchAllStops()
    const interval = setInterval(fetchAllStops, 30000) //auto refresh every 30s
    return () => clearInterval(interval)
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{ //campus coordinates
            latitude: 51.47447873223203,
            longitude: -0.03543952267621148,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004,
          }}
        >
          {stops.map((stop) => (
            <Marker
              key={stop.id}
              coordinate={{ latitude: stop.lat, longitude: stop.lon }}
              title={stop.name}
              pinColor={stop.type == 'train' ? 'blue' : 'red'}
              onPress={() =>
                navigation.navigate('StopDetailScreen', {
                  stopData: {
                    stopName: stop.name,
                    arrivals: [{ naptanId: stop.id }]
                  }
                })
              }
            />
          ))}
        </MapView>

        <FlatList
          data={groupedArrivals}
          keyExtractor={(item, index) => item.stopName + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('StopDetailScreen', {
                  stopData: {
                    stopName: item.stopName,
                    arrivals: [{ naptanId: item.arrivals[0].naptanId }]
                  }
                })
              }
            >
              <Text style={styles.title}>{item.stopName}</Text>
              <Text style={styles.time}>
                {item.arrivals.length} arrival{item.arrivals.length > 1 ? 's' : ''} listed
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#257f66'
  },
  container: {
    flex: 1
  },
  map: {
    width: Dimensions.get('window').width - 20,
    height: 250,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 5, //Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 6
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  time: {
    fontSize: 14,
    marginTop: 4
  }
})

export default TflTimeScreen
