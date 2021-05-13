import { Text, View , StyleSheet, Button, Pressable, FlatList, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import Modal from 'react-native-modal';
import React , { useEffect, useState } from 'react';
import { firebase } from '../../firebase/config';
import SwipeCards from '../../components/SwipeCard';
import { Dimensions } from 'react-native';
import HeadNav from '../../components/HeadNav';
const windowHeight = Dimensions.get('window').height;

let carrers = [];
let carrersKeys= [];
let topicKeys = [];
let selectedTopics= []
const getCarrers = async () => {
    const response = firebase.firestore().collection('carrers');
    const data = await response.get();
    data.docs.forEach((item)=>{
        let obj = {
            key: item.data().name
        }
        carrersKeys.push(obj);
        carrers.push(item.data());
    })
    console.log("carrers:", carrers);
}

const getTopics = (carrer) => {
    topicKeys = [];
    carrers.forEach(c => {
        if(c.name == carrer){
            c.topics.forEach(topic => {
                let obj = {
                    key: topic,
                    active: false
                }
                topicKeys.push(obj);
            })
        }
    })
    console.log(topicKeys);
}

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
      const [selectedCarrer,setSelected] = useState('');
      const setLoading = (load) => {
      loading = load
      }
      const [carrerContent, setCarrerContent] = useState(true);
      const [topicContent, setTopicContent] = useState(false);
      const [showCard, setCards] = useState(false);
      const toggleModal = () => {
          setCarrerContent(false);
          setTopicContent(true);
      };
  
      const toggle = () => {
          setTopicContent(false);
          setCards(true);
      };
  
      const action = (item) => {
          console.log('Selected Item :',item);
          setSelected(item);
          getTopics(item);
      }
  
      const addTopic = (topic) => {
          console.log(topic);
          selectedTopics.push(topic);
          console.log(selectedTopics);
          topicKeys.forEach((t, index) => {
              if(t.key == topic){
                  topicKeys[index].active = true;
              }
          })
          console.log(topicKeys);
      }
  
      const _renderList = ({ item }) => {
          return (
           <TouchableWithoutFeedback onPress={() => action(item.key)}>
              <View style={styles.listContainer}>
                  <Text style={styles.item} >{item.key}</Text>
              </View>
           </TouchableWithoutFeedback>
          );
      
      }
  
      const _renderTopicList = ({ item, index }) => {
          return (
           <TouchableWithoutFeedback onPress={() => addTopic(item.key)}>
              <View style={styles.listContainer}>
                  <Text style={styles.item} >{item.key}</Text>
              </View>
           </TouchableWithoutFeedback>
          );
      }
      
      const openModals = () => {
        console.log("CarrerContent ", carrerContent);
    }

      useEffect(() => {
          getCarrers()
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
                      if(userData.showTopics == undefined || userData.showTopics){
                          console.log("Show modal")
                          console.log(userData.showTopics)
                          setCarrerContent(true);
                      }
                      else{
                          setCarrerContent(false);
                      }
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
<View style={styles.centeredView}>
                { carrerContent ?
                <Modal animationType="slide" transparent={false} isVisible={carrerContent}> 
                    <View style={styles.centeredView} >
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Primero queremos saber que carrera estas estudiando</Text>
                            <Text style={{fontSize:18}}>Selecciona tu carrera</Text>
                            <View style={styles.container}>
                                <FlatList
                                    data={carrersKeys}
                                    renderItem={_renderList} />
                            </View>
                            <Text style={{fontSize:20}}>Has seleccionado: {selectedCarrer}</Text>
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={toggleModal}
                            >
                            <Text style={styles.textStyle}>Continuar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>: console.log("Closing modal")}
                { topicContent ? 
                <Modal animationType="slide" transparent={false} isVisible={topicContent}> 
                <View style={styles.centeredView} >
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Ahora cuentanos que materias estas cursando este semestre</Text>
                        <Text style={{fontSize:18}}>Selecciona tus materias</Text>
                        <View style={styles.container}>
                            <FlatList
                                data={topicKeys}
                                renderItem={_renderTopicList} />
                        </View>
                        <Text style={{fontSize:20}}>Tus materias:</Text>
                        {selectedTopics.map(topic => {<Text>{topic}</Text>})}
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={toggle}
                        >
                        <Text style={styles.textStyle}>Continuar</Text>
                        </Pressable>
                    </View>
                    </View>
                </Modal>: console.log("Closing carrers modal")}
                </View>
            {showCard ? 
            <View>
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
            </View>: console.log("showing modal")}
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
    },
        centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    modalView: {
        width: '100%',
        height: '100%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 25
    },
});
  