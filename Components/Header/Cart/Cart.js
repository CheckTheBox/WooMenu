import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";

const Cart = () => {
    return (
        <View style={styles.cart}>

        </View>
    );
}

const styles = StyleSheet.create({
    cart: {
        backgroundColor: "#283048",
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 2000,
        top: 0
    }
});


export default Cart;