import React , { useEffect, useState } from 'react';
import { Text, View , StyleSheet, Button, Pressable, FlatList, TouchableWithoutFeedback} from 'react-native';
import Modal from 'react-native-modal';
import { firebase } from '../../firebase/config';


let carrers = [];
let carrersKeys= [];
let topicKeys = [];
let selectedTopics= []
const getCarrers = async () => {
    const response = firebase.firestore().collection('carrers');
    const data = await response.get();
    console.log("data",data)
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
    let loading = false;
    const [userDB, setUser] = useState('')
    const [selectedCarrer,setSelected] = useState('');
    const setLoading = (load) => {
    loading = load
    }

    const [isCarrerModalVisible, setModalVisible] = useState(false);
    const [carrerContent, setCarrerContent] = useState(true);
    const [topicContent, setTopicContent] = useState(false);
    const toggleModal = () => {
        setCarrerContent(false);
        setTopicContent(true);
    };
    const toggle = () => {
        console.log("closing");
        setModalVisible[false];
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
                if(userData == undefined || userData.showTopics){
                    console.log("show topics");
                    setModalVisible(true);
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
        <View style={styles.centeredView}>
            <Text style={styles.title}>Feed</Text>
            <Modal animationType="slide" transparent={false} isVisible={isCarrerModalVisible}>
                { carrerContent ?<View style={styles.centeredView} >
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
                </View>: console.log("Hola")}
                { topicContent ? <View style={styles.centeredView} >
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
                </View>: console.log("Adios")}
            </Modal>
            <Button title="Show Modal" onPress={toggle} />
        </View>
    );
};

export default Feed;

const styles = StyleSheet.create({
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
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});