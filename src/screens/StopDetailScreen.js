import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TFL_KEY } from '../config';

const StopDetailScreen = ({ route }) => {
  const { stopData } = route.params
  const [groupedArrivals, setGroupedArrivals] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchUpdatedArrivals = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.tfl.gov.uk/StopPoint/${stopData.arrivals[0].naptanId}/Arrivals?app_key=${TFL_KEY}`
      )
      const data = await res.json()
      const sorted = data.sort((a, b) => a.timeToStation - b.timeToStation)

      const grouped = {}
      sorted.forEach(item => {
        const key = `${item.lineName}-${item.destinationName}`
        if (!grouped[key]) {
          grouped[key] = {
            lineName: item.lineName,
            destinationName: item.destinationName,
            times: []
          }
        }
        grouped[key].times.push(Math.round(item.timeToStation / 60))
      })

      setGroupedArrivals(grouped);
    } catch (error) {
      console.error("Error updating arrivals: ", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUpdatedArrivals()
    const interval = setInterval(fetchUpdatedArrivals, 30000)
    return () => clearInterval(interval)
  }, [])

  const arrivalData = Object.values(groupedArrivals)

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>{stopData.stopName}</Text>
        <FlatList
          data={arrivalData}
          keyExtractor={(item, index) => `${item.lineName}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.info}>
              {(item.destinationName.includes('Rail Station')) ? '🚆' : '🚌'} {item.lineName} to {item.destinationName}
              </Text>
              <Text style={styles.time}>
                Arrives in: {item.times.join(', ')} min
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#257f66',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 6,
  },
  info: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default StopDetailScreen
