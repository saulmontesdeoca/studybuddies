import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import RNPickerSelect from "react-native-picker-select";
import { firebase } from '../../firebase/config';
import { Chip } from 'react-native-elements';

const Form = ({ route, navigation }) => {
    const { fullName, email, password } = route.params;

    const [myUni, setMyUni] = useState("");
    const [myCareer, setMyCareer] = useState("");
    const [universities, setUniversities] = useState([]);
    const [careers, setCareers] = useState({});
    const [subjects, setSubjects] = useState([]);

    const getUniversities = async () => {
        const response = firebase.firestore().collection('universities');
        const data = await response.get();
        const unis = [];
        const cars = {}
        data.docs.forEach((item)=>{
            let universities = {
                label: item.data().name,
                value: item.data().name
            }
            unis.push(universities);
            cars[item.data().name] = item.data().careers;
        })
        setUniversities(unis);
        setCareers(cars);
    }

    const getCareers = () => {
        return (
            <View>
                <Text style={styles.titleCareers}>Choose you career:</Text>
                <View style={{flexDirection: "row", flexWrap: "wrap", marginHorizontal: 30}}>
                {careers[myUni].map((car, index) => {
                    return <Chip key={index} style={{width: 70, margin: 2}} title={car} type="outline" onPress={ ({title}) => {
                        setMyCareer(car);
                        setSubj(car);
                    }}/>
                })}
                </View>
            </View>
        )
    }

    const setSubj = async (car) => {
        const careersRef = firebase.firestore().collection('careers');
        const data = await careersRef.where('name', '==', car).get();
        let ids = [];
        data.docs.forEach(doc => {
            ids = doc.data().topicsID;
        })
        setSubjects(ids);
    }

    useEffect( () => {
        getUniversities();
    }, []);

    return (
        <SafeAreaView>
            <Text style={styles.salute}>My school is 🎓</Text>
            <View style={styles.shadow}>
                <View style={styles.input}>
                    <RNPickerSelect
                        placeholder={{ label: "Select your school", value: null }}
                        onValueChange={ value => {
                            setMyUni(value);
                            setMyCareer('');
                        }}
                        items={universities}
                    />
                </View>
            </View>
            {myUni ? getCareers() : null}
            {myCareer ? 
                <View>
                    <Text style={styles.titleCareers}>
                        I'm in {myCareer }
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('SelectClasses',
                        {
                            fullName: fullName, 
                            email: email, 
                            password: password,
                            myUni: myUni,
                            myCareer: myCareer,
                            subjects: subjects
                        })}>
                        <Text style={styles.buttonTitle}>Continue</Text>
                    </TouchableOpacity>
                </View>
                : null
            }
        </SafeAreaView>
    );
};

export default Form;


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#C26DBC',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        
        elevation: 20,
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
        fontSize: 42,
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
        fontSize: 32,
    },
});