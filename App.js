import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Header from "./Components/Header/Header";
import newAPI from "./API/MainApi";
import Navbar from "./Components/Navbar/Navbar";
// import { AsyncStorage } from 'react-native';

const App = () => {


    function makeid(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }


    // let _retrieveData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('TASKS');
    //         if (value !== null) {
    //             // We have data!!
    //             console.log(value);
    //         }
    //     } catch (error) {
    //         // Error retrieving data
    //     }
    // };





    const [categories, setCategories] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        newAPI.get('app_categories/').then(response => {
            // console.log(response.data.data);
            setCategories(response.data.data);
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        newAPI.get('organization_info/').then(response => {
            setInfo(response.data.banners[response.data.banners.length - 1]);
            // console.log(response.data.banners[response.data.banners.length - 1])
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <>

            <View style={styles.app}>

                <Header setOpen={setOpen}/>


                <Image key={info.id} source={{uri: `https://api.ryba-love.uz${info.url}`}} style={{
                    width: 780,
                    height: 400,
                    alignSelf: "center",
                    marginBottom: 20,
                }}/>


                {/*<View style={styles.searchSection}>*/}
                {/*    <TextInput*/}
                {/*        style={styles.input}*/}
                {/*        placeholder="Поищем?"*/}
                {/*        placeholderTextColor="#838ca6"*/}
                {/*        // onChangeText={(searchString) => {this.setState({searchString})}}*/}
                {/*        underlineColorAndroid="transparent"*/}
                {/*    />*/}
                {/*    <SearchIcon style={styles.searchIcon} name="search" size={23} color="#838ca6"/>*/}
                {/*</View>*/}


                <Navbar categories={categories} isOpen={isOpen} setOpen={setOpen}/>


            </View>


        </>
    );
}

const styles = StyleSheet.create({
    app: {
        backgroundColor: "#283048",
        width: "100%",
        height: "100%",
        margin: 0
    },
    content: {
        width: "100%",
        height: "50%"
    },


    searchSection: {

        flexDirection: 'row',
        justifyContent: 'center',

        alignSelf: "center",
        width: 780,
        borderColor: '#191f2d',
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: "#1e2436",
        marginTop: 20,
        marginBottom: 20
    },
    searchIcon: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 10,
    },
    input: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        color: "#b7c2e5",
        fontSize: 16,
    },
});

export default App;
