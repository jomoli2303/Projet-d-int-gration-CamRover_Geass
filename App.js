import { StyleSheet, View,TouchableOpacity,Text,WebView} from 'react-native';





import React from 'react';







export default function App() {

    const Ipadress = '312';





    return(

        <View style={{

            flex: 1.5,

            justifyContent: 'center',

            alignItems: 'center',

            backgroundColor: 'black',

        }}>

            <View style={{ width: 240, height: 320 }}>

                <WebView

                    automaticallyAdjustContentInsets={true}

                    scalesPageToFit={true}

                    startInLoadingState={false}

                    scrollEnabled={false}

                    source={{uri: `http://${Ipadress}/stream/video.mjpeg`}}

                />



            </View>

            <View style={styles.container}>

                <CrossButtonLayout pad />



            </View>

        </View>

    );



}

const sendCommandToPi = async (command) => {

    try {

        const response = await fetch('http://${Ipadress}:190001/command', {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json',

            },

            body: JSON.stringify({command }),

        });

        const data = await response.text();

        console.log(data);

    } catch (error) {

        console.error('Error:', error);

    }

};

const CustomButton = ({ title,  command }) => {

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

                <CustomButton up title = "▲"  ommand = "up" />

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

        flex: 1,

        alignItems: 'center',

    },

    spaceBetween: {

        marginHorizontal: 10, // Adjust the value as needed

        marginVertical : 10,

    },

    button: {

        backgroundColor: 'blue',

        paddingVertical: 30,

        paddingHorizontal: 40,

        borderRadius: 50,

        margin: -10,

    },

    buttonText: {

        color: 'white',

        fontSize: 18,

    },



});
