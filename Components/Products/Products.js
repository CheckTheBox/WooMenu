import React, {useEffect, useState} from "react";
import {Image, ImageBackground, ScrollView, StyleSheet, Text, View, Button, TouchableOpacity} from "react-native";
import Product from "../Product/Product";
import MenuIcon from "react-native-vector-icons/AntDesign";

const Products = (props) => {

    const [state, setState] = useState([]);
    const [products, setProducts] = useState([]);
    const [oldState, setOldState] = useState([]);
    const [oldProducts, setOldProducts] = useState([]);
    const [title, setTitle] = useState('');
    const [oldTitle, setOldTitle] = useState([]);

    const [isProductOpen, setProductOpen] = useState(false);
    const [data, setData] = useState({})

    function getDataInData(data) {
        setState(data);
    }

    function CreateProduct(e) {
        setData(e);
        setProductOpen(true);
    }

    useEffect(() => {
        getDataInData(props.data.subcategories);
        setProducts(props.data.child_products)
        setTitle(props.data.name)
    }, [])

    // useEffect(() => {
    //     console.log("state: " + state);
    //     console.log("oldState: " + oldState);
    // }, [state])

    function Back() {
        if (oldState.length > 0) {
            setState(oldState[oldState.length - 1]);
            oldState.pop();

            if (oldTitle.length > 0) {
                setTitle(oldTitle[oldTitle.length - 1]);
                oldTitle.pop();
            }

            if (oldProducts.length > 0) {
                setProducts(oldProducts[oldProducts.length - 1])
                oldProducts.pop();
            }
        } else {
            props.setOpen(false);
        }


    }

    return (
        <>

            <MenuIcon name="arrowleft" size={30} color="white" style={{
                marginLeft: 15,
                backgroundColor: "#283048",
                position: 'absolute',
                top: 20,
                left: 0,
                zIndex: 1000,
            }}

                      onPress={() => Back()}
            />


            <View style={styles.products}>

                <ScrollView contentContainerStyle={styles.productsNavbar} showsVerticalScrollIndicator={false}>

                    {state.length > 0 ?
                        <>
                            <Text style={{fontSize: 32, color: "white", marginBottom: 20}}>Подкатегории:</Text>

                            <View style={{
                                width: "100%",
                                backgroundColor: "rgba(0,0,0,0.25)",
                                height: 5, marginBottom: 10, borderRadius: 5
                            }}>
                            </View>
                            <View style={styles.navbarInner}>

                                {state.map(k =>
                                    <ImageBackground source={{uri: `https://api.ryba-love.uz${k.image_url}`}}
                                                     resizeMode="cover"
                                                     style={styles.image} key={k.id}>
                                        <TouchableOpacity style={{
                                            width: "100%",
                                            height: "100%",
                                            alignItems: "center",
                                            display: "flex",
                                            justifyContent: "center",

                                        }} onPress={() => {
                                            setOldState([...oldState, state]);
                                            setOldProducts([...oldProducts, products]);
                                            setOldTitle([...oldTitle, title]);
                                            getDataInData(k.subcategories);
                                            setProducts(k.child_products);
                                            setTitle(k.name);
                                        }}>
                                            <Text style={styles.text}

                                            >
                                                {k.name}</Text>
                                        </TouchableOpacity>

                                    </ImageBackground>
                                )}

                            </View>
                        </>
                        : <></>}


                    <Text style={{
                        fontSize: 32,
                        color: "white",
                        marginBottom: 10,

                    }}>{title}</Text>

                    <View style={{
                        width: "100%",
                        backgroundColor: "rgba(0,0,0,0.25)",
                        height: 5, marginBottom: 10, borderRadius: 5
                    }}>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        width: '100%'
                    }}>
                        {
                            products.length > 0 ?
                                products.map(k => <View key={k.id} style={{
                                        borderColor: "#C6C8CE80",
                                        padding: 10,
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        width: 375,
                                        margin: 5,
                                        borderRadius: 6,

                                    }}>
                                        <Image

                                            source={{uri: `https://api.ryba-love.uz${k.image_url}`}} style={{
                                            width: "100%",
                                            height: 250,
                                            marginBottom: 10,
                                            backgroundColor: "white"
                                        }}/>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                color: "white",
                                                fontSize: 21,
                                                marginBottom: 10,
                                                fontWeight: "bold"

                                            }}>
                                            {k.name}
                                        </Text>
                                        <View style={{
                                            width: "100%",
                                            backgroundColor: "rgba(0,0,0,0.25)",
                                            height: 5, marginBottom: 10, borderRadius: 5
                                        }}>
                                        </View>
                                        <Text
                                            numberOfLines={3}
                                            ellipsizeMode="tail"
                                            style={{
                                                color: "white",
                                                fontSize: 16,
                                                marginBottom: 10,
                                            }}>
                                            {k.about}
                                        </Text>


                                        <Button
                                            title={`${k.price} сум`}
                                            color="#c76000"
                                            onPress={() => CreateProduct(k)}
                                        />
                                    </View>
                                ) : <Text style={{fontSize: 24, color: "white"}}>Здесь нет товаров...</Text>
                        }
                    </View>

                </ScrollView>
            </View>

            {isProductOpen === true ? <Product data={data} setProductOpen={setProductOpen} title={title}/> : <></>}
        </>
    );
}

const styles = StyleSheet.create(
        {
            products: {
                backgroundColor: "#283048",
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: 500,
                top: 0,
                paddingTop: 80,
                paddingRight: 20,
                paddingLeft: 20,
                paddingBottom: 20
            },
            navbarInner: {
                // backgroundColor: "#283048",
                // backgroundColor: "white",
                // flexDirection: "row",
                // flexWrap: "nowrap",
                // width: '100%'
                flexDirection: "row",
                flexWrap: "wrap",
                width: '100%',
                marginBottom: 80,
            },
            image: {
                justifyContent: "center",
                width: 345,
                height: 250,
                margin: 10,
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
            },
            productsNavbar: {}
        }
    )
;


export default Products;