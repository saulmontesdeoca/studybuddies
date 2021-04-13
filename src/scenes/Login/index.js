import React, { useState } from 'react'
import {StyleSheet, Button, Image, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../../firebase/config';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Signin')
    }

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        console.log("Everything ok, come in Sir")
                        navigation.navigate('Feed', {user})
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Text style={styles.salute}>Welcome back, buddy!</Text>
                <View style={styles.shadow}>
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.shadow}>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Password'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default Login;

/*
Paleta de colores
Lila #EEB5EB
Orchid #C26DBC
Turquoise #C8F4F9
Blue green #3CACAE
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center'
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
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20,
    },
    footerText: {
        fontSize: 16,
        color: '#C26DBC'
    },
    footerLink: {
        color: "#4E4E4E",
        fontWeight: "bold",
        fontSize: 16
    },
    salute: {
        fontWeight: "bold",
        fontSize: 42,
        color: '#4E4E4E',
        margin: 30,
        marginTop: windowHeight/6
    }
});
  