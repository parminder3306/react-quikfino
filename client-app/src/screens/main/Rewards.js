import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const CurrencyRatesCard = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch live currency rates from an API
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD'); // Replace with preferred API
        const data = await response.json();
        setRates(data.rates);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRates();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={Object.entries(rates)}
      keyExtractor={(item) => item[0]}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.currencyName}>{item[0]}</Text>
          <Text style={styles.currencyRate}>Rate: {item[1]}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  currencyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  currencyRate: {
    fontSize: 16,
    color: '#666',
  },
});

export default CurrencyRatesCard;
