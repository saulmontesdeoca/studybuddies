import React , { useEffect, useState } from 'react';
import { Text, View , StyleSheet, Button} from 'react-native';
import { firebase } from '../../firebase/config';

const Feed = ({ navigation }) => {

    let loading = false;
    const [userDB, setUser] = useState('')
    const setLoading = (load) => {
    loading = load
    }

    useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
        usersRef
            .doc(user.uid)
            .get()
            .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
            console.log(userData)
            })
            .catch((error) => {
            setLoading(false)
            });
        } else {
        setLoading(false)
        }
    });
    }, []);

    if (loading) {	
        return (	
            <></>	
        )	
    }
    return (
        <View style={styles.container}> 
            <Text>Feed</Text>
            <Button title="Go to Signin" onPress={() => navigation.navigate('Signin')} />
            <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
            <Button title="Go to ChatRooms" onPress={() => navigation.navigate('ChatRooms')} />
            <Button title="Go to Profile" onPress={() => navigation.navigate('Profile',
            {
            user: userDB,
            }
            )}/>
        </View>
    );
};

export default Feed;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
  