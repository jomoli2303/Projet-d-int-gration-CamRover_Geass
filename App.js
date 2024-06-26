//Code pour les Websocket et la caméra inspiré de : https://github.com/oskaerik/robot-control

import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import socketIO from 'socket.io-client';


const IPAddress = '10.0.0.35';

const App = () => {
    // Initialize socket connection
    useEffect(() => {
        const socket = socketIO('10.0.0.35:3000', { transports: ['websocket'] });

        socket.on('connect', (socket) => {
            console.log("Connected to server");
        });

        // Function to send command to Pi
        const sendCommandToPi = (command) => {
            try {
                socket.emit('buttonPress', command);
            } catch (error) {
                console.error('Error:', error);
            }
        };


        // Cleanup socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <View style={{ flex: 1.5, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 340, height: 540 }}>
                <WebView
                    automaticallyAdjustContentInsets={true}
                    scalesPageToFit={true}
                    startInLoadingState={false}
                    scrollEnabled={false}
                    source={{ uri: 'http://10.0.0.35:8080/stream/video.mjpeg' }}
                />
            </View>
            <View style={{ position: 'absolute', bottom: 20 }}>
                <CrossButtonLayout />
            </View>
        </View>
    );
};

const sendCommandToPi = (command) => {
    if (App.sendCommandToPi) {
        App.sendCommandToPi(command);
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
                <CustomButton title="▲" command="up" sendCommandToPi={sendCommandToPi} />
            </View>
            <View style={styles.centerRow}>
                <View style={[styles.column, styles.spaceBetween]}>
                    <CustomButton title="◀" command="left" sendCommandToPi={sendCommandToPi}/>
                </View>
                <View style={[styles.column, styles.spaceBetween]}>
                    <CustomButton title="▶" command="right" sendCommandToPi={sendCommandToPi} />
                </View>
            </View>
            <View style={styles.row}>
                <CustomButton title="▼" command="down" sendCommandToPi={sendCommandToPi}/>
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
        marginHorizontal: 70,
        marginVertical: 10,
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

export default App;
