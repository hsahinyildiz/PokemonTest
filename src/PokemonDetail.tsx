import React from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PokemonDetail = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Text>detail page</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFF",
    },
});

export default PokemonDetail;
