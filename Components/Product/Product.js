import React from "react";
import {Button, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import MenuIcon from "react-native-vector-icons/AntDesign";

const Product = (props) => {
    console.log(props.data)
    return (<>
        <MenuIcon name="arrowleft" size={30} color="white" style={{
            marginLeft: 15,
            backgroundColor: "#283048",
            position: 'absolute',
            top: 20,
            left: 0,
            zIndex: 1000,
        }}

                  onPress={() => props.setProductOpen(false)}
        />
        <View style={styles.product}>
            <ScrollView contentContainerStyle={{
                width: '100%',
                marginBottom: 80,
            }} showsVerticalScrollIndicator={false}>
                <Image
                    source={{uri: `https://api.ryba-love.uz${props.data.image_url}`}} style={{
                    width: "100%",
                    height: 500,
                    marginBottom: 20,
                    backgroundColor: "white"
                }}/>
                <Text style={{
                    color: "white",
                    alignSelf: "center",
                    fontWeight: "bold",
                    fontSize: 32,
                    marginBottom: 20,
                }}>
                    {props.data.name}
                </Text>
                <Text style={{
                    color: "white",
                    alignSelf: "center",
                    fontWeight: "bold",
                    fontSize: 25,
                    marginBottom: 20,
                }}>
                    {props.title}
                </Text>
                <Text style={{
                    color: "white",
                    alignSelf: "center",
                    fontSize: 25,
                    marginBottom: 20,
                }}>
                    {props.data.price} сум
                </Text>
                <Text style={{
                    color: "white",
                    alignSelf: "center",
                    fontSize: 25,
                    marginBottom: 30,
                }}>
                    {props.data.about}
                </Text>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: 20,
                    paddingLeft: 20,
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: 100,
                    }}>
                        <Text style={{
                            color: "white",
                            fontSize: 40,
                        }}>-</Text>
                        <Text style={{
                            color: "white",
                            fontSize: 25,
                        }}>
                            0
                        </Text>
                        <Text style={{
                            color: "white",
                            fontSize: 30,
                        }}>+</Text>
                    </View>
                    <View style={{
                        width: 200,
                    }}>
                        <Button
                            title="Добавить в корзину"
                            color="#c76000"
                            onPress={() => {
                            }}
                        />
                    </View>
                </View>

            </ScrollView>
        </View>
    </>);
}

const styles = StyleSheet.create({
    product: {
        backgroundColor: "#283048",
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 501,
        top: 0,
        paddingTop: 100,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 20,
    },
});

export default Product;