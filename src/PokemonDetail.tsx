import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { PokemonDetailRouteProp } from "../navigationTypes";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";

type AbilityType = {
    name: string;
    text: string;
}

type PokemonCardType = {
    id: string;
    name: string;
    images: { large: string };
    hp: string;
    types: string[];
    abilities?: AbilityType[];
}

const PokemonDetail = () => {
    const route = useRoute<PokemonDetailRouteProp>();
    const { cardId } = route.params;
    const [card, setCard] = useState<PokemonCardType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCardDetail = async () => {
            try {
                const response = await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`);
                const data = await response.json();
                setCard(data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCardDetail();
    }, [cardId]);

    if (loading) return <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
    </View>;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {card && (
                    <>
                        <Image source={{ uri: card.images.large }} style={styles.image} />
                        <Text style={styles.name}>{card.name}</Text>
                        <Text style={styles.text}>HP: {card.hp}</Text>
                        <Text style={styles.text}>Tür: {card.types?.join(", ")}</Text>
                        {card.abilities && card.abilities.length > 0 && (
                            <View style={styles.abilitiesView}>
                                <FlatList
                                    data={card.abilities}
                                    keyExtractor={(item) => item.name}
                                    renderItem={({ item }) => (
                                        <>
                                            <Text style={styles.abilityName}>{item.name}</Text>
                                            <Text style={styles.abilityText}>{item.text}</Text>
                                        </>
                                    )}
                                />
                            </View>
                        )}
                    </>
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    image: {
        width: wp("50%"),
        height: hp("38%"),
        resizeMode: "contain",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        color: '#000'
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        color: '#000'
    },
    abilitiesView: {
        marginTop: 10
    },
    abilityName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10
    },
    abilityText: {
        fontSize: 14,
        color: "#000"
    },
});

export default PokemonDetail;
