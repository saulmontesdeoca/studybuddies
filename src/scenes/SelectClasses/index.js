import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { firebase } from '../../firebase/config';
import { Chip } from 'react-native-elements';

const SelectClasses = ({route, navigation}) => {
    const { myUni, myCareer } = route.params;
    const [myClasses, setMyClasses] = useState([]);
    const [options, setOptions] = useState([]);

    const getOptions = async () => {
        const careersRef = firebase.firestore().collection('careers');
        const data = await careersRef.where('name', '==', myCareer).get()
            .then( car => {
                car.forEach(doc => {
                    setOptions(doc.data().topics);
                });
            })

        // data.forEach(doc => {
        //     setOptions([...options, doc.data().topics]);
        // });
    }

    useEffect( () => {
        getOptions();
        console.log(options);
    }, [myCareer]);

    return (
        <SafeAreaView>
            {/* <Text style={styles.salute}>Your uni: {myUni}</Text>
            <Text style={styles.salute}>Your career: {myCareer}</Text> */}
            <Text style={styles.salute}>Select your classes 📚</Text>
            <View style={{flexDirection: "row", flexWrap: "wrap", marginHorizontal: 30}}>
                {options ? options.map((option, key) => (
                    <Chip 
                        key={key}
                        style={{marginVertical: 3}}
                        title={option}
                        type="outline"
                        onPress={({title})=> {
                            setOptions(options.filter((value, index, arr) => {
                                return !(value===option)
                            })); 
                            setMyClasses([...myClasses, option])
                        }}
                    />
                )) : null}
            </View>
            {myClasses ? 
            <View>
                <Text style={styles.salute}>My Classes: 📚</Text>
                <View style={{flexDirection: "row", flexWrap: "wrap", marginHorizontal: 30}}>
                    {myClasses.map((myClass, key) => (
                        <Chip 
                        style={{marginVertical: 3}}
                        key={key}
                        title={myClass}
                        onPress={({title})=> {
                            setMyClasses(myClasses.filter((value, index, arr) => {
                                return !(value===myClass)
                            })); 
                            setOptions([...options, myClass])
                        }}
                        />
                    ))}
                </View>
            </View>
            :null}
        </SafeAreaView>
    );
};

export default SelectClasses;


const styles = StyleSheet.create({
    topic: {
        fontSize: 18
    },
    button: {
        backgroundColor: '#C26DBC',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: 'center',
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    input: {
        height: 48,
        borderRadius: 100,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 24,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
    },
    salute: {
        fontWeight: "bold",
        fontSize: 34,
        color: '#4E4E4E',
        margin: 30,
    },
    titleCareers: {
        fontWeight: "bold",
        fontSize: 36,
        color: '#4E4E4E',
        margin: 30,
    },
    select: {
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, //
    },
    input: {
        height: 48,
        borderRadius: 100,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 24,
        paddingTop: 15,
        color: '#4E4E4E',
    },
    container: {
        flex: 1,
        backgroundColor:'blue',
        height: 100
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 24,
    },
});