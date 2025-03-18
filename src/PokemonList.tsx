import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";

interface PokemonCardType {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
}

const PokemonList = () => {
  const [pokemonCards, setPokemonCards] = useState<PokemonCardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const getCards = async () => {
    try {
      if (page === 1) setLoading(true);
      else setIsFetchingMore(true);

      const response = await fetch(`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=10`);
      const data = await response.json();
      setPokemonCards(prev => [...prev, ...data.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    getCards();
  }, [page]);

  const loadMore = () => {
    if (!isFetchingMore) setPage(prev => prev + 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <FlatList
            data={pokemonCards}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                console.log(item)
              }}
                activeOpacity={0.7} style={styles.card}>
                <Image source={{ uri: item.images.small }} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() => (
              <View style={styles.footer}>
                {isFetchingMore ? (
                  <>
                    <ActivityIndicator size="small" color="blue" />
                    <Text style={styles.footerText}>Yükleniyor...</Text>
                  </>
                ) : (
                  <View style={{ height: 35 }} />
                )}
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "#EEE",
    margin: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: wp("40%"),
    height: hp("20%"),
    resizeMode: "contain",
  },
  name: {
    marginTop: 8,
    fontSize: wp("3.5%"),
    fontWeight: "bold",
    textAlign: "center",
    color: '#000'
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: wp("3.5%"),
    color: "#000",
    marginTop: 5,
  },
});

export default PokemonList;
