import React , { useEffect, useState } from 'react';
import { Text, View , StyleSheet, Button, SafeAreaView} from 'react-native';
import { firebase } from '../../firebase/config';
import SwipeCards from '../../components/SwipeCard';
import { Dimensions } from 'react-native';
import HeadNav from '../../components/HeadNav';
const windowHeight = Dimensions.get('window').height;

const Feed = ({ navigation }) => {
    const state = {
        user: {
          id: '1',
          name: 'Saul',
          yup: [],
          nope: [],
          matches: [],
        },
        cards: [
          {
            id: '2',
            name: 'Camila',
            carrera: 'ITC',
            imgUrl:
              'https://image.freepik.com/foto-gratis/adorable-estudiante-cabello-rizado-viste-camiseta-blanca-informal-mono-sostiene-bloc-notas-o-libro-texto_95891-107.jpg',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          },
          {
            id: '3',
            name: 'Marcela',
            carrera: 'ITI',
            imgUrl:
              'https://www.arenasimulation.com/public/uploads/images/general/studentpic1.png',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          },
          {
            id: '4',
            name: 'Saul',
            carrera: 'ITC',
            imgUrl:
              'https://s.libertaddigital.com/2019/08/15/estudiante-biblioteca-libros.jpg',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          },
          {
            id: '5',
            name: 'Diegolas',
            carrera: 'ITC',
            imgUrl:
              'https://rogersbh.org/application/files/thumbnails/small/2815/3632/7168/podcastblog2.jpg',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          },
          {
            id: '6',
            name: 'Victor',
            carrera: 'ITC',
            imgUrl: 'https://thispersondoesnotexist.com/image',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          },
          {
            id: '7',
            name: 'El JC claro que si',
            carrera: 'ITC',
            imgUrl: 'https://thispersondoesnotexist.com/image',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          },
        ],
      };
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
        <SafeAreaView style={styles.container}> 
            <View style={styles.containerTitle}>
                {/* <Text style={styles.title}>Descubre 👾</Text> */}
                <HeadNav/>
            </View>
            <View style={styles.deckContainer}>
                <SwipeCards buddies={state.cards} user={state.userDB}/>
            </View>
            <View style={styles.buttonsArea}>
                <Text style={styles.title}></Text>
            </View>
        </SafeAreaView>
    );
};

export default Feed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    buttonsArea:{
        flex:1,
        // backgroundColor: "blue"

    },
    title: {
        fontWeight: "bold",
        fontSize: 42,
        color: '#4E4E4E',
    },
    containerTitle: {
        flex:1,
        // marginLeft: 20,
        // backgroundColor: "green"
    },
    deckContainer: {
        flex: 8,
        // backgroundColor: "red"
    }
});
  