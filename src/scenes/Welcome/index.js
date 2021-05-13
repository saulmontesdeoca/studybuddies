import React from 'react';
import { Text, View , StyleSheet, Image, ImageBackground} from 'react-native';
import Button from '../../components/Button'
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Welcome = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Welcome to</Text>
            </View>
            <Image
                    style={styles.logo}
                    source={require('../../../assets/logo-short.png')}
            />
            <ImageBackground
                style={styles.fadingImage}
                source={require('../../../assets/welcome.jpg')}
            >
                <LinearGradient 
                    colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0.912)','rgba(255,255,255,0.09)','rgba(255,255,255,0.09)','rgba(255,255,255,0.09)', 'rgba(255,255,255,0)','transparent']}
                    style={styles.gradient}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="start" onPress={() => navigation.navigate('Login')} />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    fadingImage: {
        flex: 1,
        width: '100%',
        maxHeight: '100%',
        resizeMode: 'contain',
    },
    headerContainer: {
        flex: 1,
        marginHorizontal: 20,
    },
    logo: {
        flex: 1,
        width: null,
        maxHeight: 85,
        marginHorizontal: 20,
    },
    title: {
        fontWeight: "bold",
        fontSize: 42,
        color: '#4E4E4E',
    },
    containerTitle: {
        margin: 20,
        marginBottom: 15,
        marginTop: windowHeight/9
    },
    containerBottom: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'stretch',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    button: {
        width: 120,
        marginTop: 15,
        marginRight: 30,
    },
    buttonContainer: {
        flexDirection: 'row-reverse',
    }
});