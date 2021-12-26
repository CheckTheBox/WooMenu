import React, {useState} from 'react';
import {StyleSheet, Text, Image, ScrollView, ImageBackground, View, TouchableOpacity} from "react-native";
import Products from "../Products/Products";

const Navbar = (props) => {

    // const [state, setState] = useState([]);
    //
    // function getDataInData(data) {
    //     data.map((e) => {
    //             // array = Object.create({id: e.id, name: e.name, image: e.image});
    //             state.push({id: e.id, name: e.name, image: e.image_url, subcategories: e.subcategories});
    //
    //             // if (e.subcategories.length > 0) {
    //             //     getDataInData(e.subcategories);
    //             // }
    //         }
    //     )
    // }


    const [data, setData] = useState({})

    function CreateProducts(e) {
        setData(e);
        props.setOpen(true);
    }


    return (
        <>

            <ScrollView contentContainerStyle={styles.navbar} showsVerticalScrollIndicator={false}>
                {/*{getDataInData(props.categories)}*/}

                {props.categories.map(k =>
                    <ImageBackground source={{uri: `https://api.ryba-love.uz${k.image_url}`}} resizeMode="cover"
                                     style={styles.image} key={k.id}>
                        <TouchableOpacity  style={{
                            width: "100%",
                            height: "100%",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",

                        }} onPress={() => CreateProducts(k)}>
                            <Text style={styles.text}>{k.name}</Text>
                        </TouchableOpacity >
                    </ImageBackground>
                )}

            </ScrollView>

            {props.isOpen === true ? <Products data={data} setOpen={props.setOpen}/> : <></>}
        </>
    );
}

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: "#283048",
        flexDirection: "row",
        flexWrap: "wrap",
        width: '100%'
    },
    image: {
        justifyContent: "center",
        width: 345,
        height: 250,
        margin: 30,
    },
    text: {
        color: "white",
        fontSize: 25,
        lineHeight: 100,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "rgba(0,0,0,0.7)",
        margin: 50,
        borderRadius: 10,
        width: 220,
    }
});

export default Navbar;