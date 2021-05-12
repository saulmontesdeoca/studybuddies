import 'react-native-gesture-handler';
import React , { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Button } from 'react-native';
import Feed from './src/scenes/Feed';
import Login from './src/scenes/Login';
import Signin from './src/scenes/Signin';
import ChatRooms from './src/scenes/ChatRooms';
import Welcome from './src/scenes/Welcome';
import Profile from './src/scenes/Profile';
import { firebase } from './src/firebase/config';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

/*
Paleta de colores
Lila #EEB5EB
Orchid #C26DBC
Turquoise #C8F4F9
Blue green #3CACAE
*/

const Stack = createStackNavigator();
let loading = false;
export default function App() {
  const [userDB, setUser] = useState('')
  const setLoading = (load) => {
    loading = load
  }

  if (loading) {	
    return (	
      <></>	
    )	
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
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Feed" component={Feed}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="ChatRooms" component={ChatRooms} />
        <Stack.Screen name="Profile">
          {props => <Profile {...props} user={userDB} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
