import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import ShopIcon from 'react-native-vector-icons/AntDesign';
import MenuIcon from 'react-native-vector-icons/SimpleLineIcons';
import newAPI from '../../API/MainApi'
import Menu from "./Menu/Menu";

const Header = (props) => {

    const [isMenu, setMenu] = useState(false);


    return (
        <>
            <View style={styles.header}>
                {/*<Image source={require('../../images/logo.png')} style={{*/}
                {/*    width: 80, height: 80,*/}
                {/*    marginLeft: 10*/}
                {/*}}/>*/}

                <MenuIcon name="menu" size={25} color="white" style={{
                    marginLeft: 15
                }}
                          onPress={() => setMenu(true)}
                />

                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <ShopIcon name="shoppingcart" size={30} color="white" style={{
                        marginRight: 15
                    }}/>

                    <Text style={{color: "white", fontSize: 27, marginRight: 25}}>0</Text>
                </View>
            </View>

            {/*{isMenu === true ? <Menu setMenu={setMenu}/> : <></>}*/}
            <Menu setMenu={setMenu} isMenu ={isMenu} setOpen={props.setOpen}/>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#283048",
        width: "100%",
        height: 70,
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        zIndex: 999,
    }
});

export default Header;