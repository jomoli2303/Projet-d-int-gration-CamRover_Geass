//Code pour le Webview inspire de https://github.com/oskaerik/robot-control/blob/master/reactnative/components/camera/Camera.js

import { StyleSheet, View,TouchableOpacity,Text} from 'react-native';
import {WebView} from 'react-native-webview';
import socket from 'socket.io-client';




import React from 'react';







export default function App() {

    const Ipadress = '192.168.2.107';





    return (
        <View style={{ flex: 1.5, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 340, height: 540 }}>
                <WebView
                    automaticallyAdjustContentInsets={true}
                    scalesPageToFit={true}
                    startInLoadingState={false}
                    scrollEnabled={false}
                    source={{ uri: `http://192.168.2.107:19001/stream/video.mjpeg` }}
                />
            </View>
            <View style={{ position: 'absolute', bottom: 20 }}>
                <CrossButtonLayout pad />
            </View>
        </View>
    );





}
constructor(props); {
    super(props);

    // Connect to server
    this.socket = socket('192.168.0.106:3000', { transports: ['websocket'] });
    this.socket.on('connect', (socket) => {
        console.log("Connected to server");
    });}

const sendCommandToPi =  (command) => {

    try {
        this.socket.emit('buttonPress', command);
       

    } catch (error) {

        console.error('Error:', error);

    }

};

const CustomButton = ({ title, command }) => {
    return (
        <TouchableOpacity onPress={() => sendCommandToPi(command)} style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};




const CrossButtonLayout = () => {

    return (

        <View style={styles.container}>

            <View style={styles.row}>

                <CustomButton up title = "▲"  command = "up" />

            </View>

            <View style={styles.centerRow}>

                <View style={[styles.column, styles.spaceBetween]}>

                    <CustomButton title="◀"  command = "left"/>

                </View>

                <View style={[styles.column, styles.spaceBetween]}>

                    <CustomButton title ="▶"  command="right"/>

                </View>

            </View>

            <View style={styles.row}>

                <CustomButton title ="▼"   command = "down"/>

            </View>

        </View>

    );

};



const styles = StyleSheet.create({

    container: {

        flex: 1,

        justifyContent: 'center',

        alignItems: 'center',

    },

    row: {

        flexDirection: 'row',

    },

    centerRow: {

        flexDirection: 'row',

        alignItems: 'center',

    },

    column: {


        alignItems: 'center',

    },

    spaceBetween: {

        marginHorizontal: 70, // Adjust the value as needed

        marginVertical : 10,

    },

    button: {

        backgroundColor: 'blue',

        paddingVertical: 22.5,

        paddingHorizontal: 40,

        borderRadius: 50,

        margin: -10,

    },

    buttonText: {

        color: 'white',

        fontSize: 18,

    },



});