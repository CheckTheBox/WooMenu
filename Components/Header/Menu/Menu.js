import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

const Menu = (props) => {

    const slideAnim = useRef(new Animated.Value(-500)).current

    function startAnim (){
        Animated.timing(
            slideAnim,
            {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }
        ).start();
    }

    function endAnimation (){
        Animated.timing(
            slideAnim,
            {
                toValue: -500,
                duration: 300,
                useNativeDriver: true,
            }
        ).start();
    }


   if(props.isMenu === true){
       startAnim();
   }

    return (
        <>
            <Animated.View style={[
                {
                    position: "absolute",
                    zIndex: 1001,
                    backgroundColor: "#283048",
                    height: "100%",
                    width: 320,
                    paddingLeft: 40,
                    transform: [{translateX: slideAnim}],
                }
            ]}>
                <Text style={{color: "white", marginBottom: 50, marginTop: 30, fontSize: 32}}>KAIZEN</Text>
                <Text style={{color: "white", fontSize: 20, width: 200, marginBottom: 20}} onPress={()=>props.setOpen(false)}>
                    🏡 Главная страница</Text>
                <Text style={{color: "white", fontSize: 20, width: 200, marginBottom: 20}}>🛒 Корзина</Text>

            </Animated.View>

            {props.isMenu === true ? <Text style={styles.back} onPress={() => { endAnimation(); props.setMenu(false); }}>

            </Text>: <></>}

        </>
    );
}

const styles = StyleSheet.create({
    back: {
        backgroundColor: "rgba(0,0,0,0.58)",
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1000
    }
});

export default Menu;
