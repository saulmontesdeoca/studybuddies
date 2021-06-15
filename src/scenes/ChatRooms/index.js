import React, { useEffect, useState } from 'react';
import { Text, View , StyleSheet, Button, Image, TouchableWithoutFeedback} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../../firebase/config';
const ChatRooms = ({route, navigation}) => {
    console.log(route.params.user);
    let user = route.params.user;
    let chat;
    let ready = false;

    let chatRooms = [
      {
          commonClass: "Bases de datos avanzadas",
          fullName: "Saul Montes de Oca",
          lastMessage: "¿Puedes mañana a las 2 pm?",
          email: "saul_itoMDO@hotmail.com",
          profilePicture: "https://avatars.githubusercontent.com/u/29721482?v=4",
          isRead: false,
      },
      {
          commonClass: "Fundamentos de programación",
          fullName: "Luis García",
          lastMessage: "Creo que se entrega antes de la clase",
          email: "luispillo@hotmail.com",
          profilePicture: "https://avatars.githubusercontent.com/u/31284430?v=4",
          isRead: true,
      },
      {
          commonClass: "Seguridad Informatica",
          fullName: "Victor Coeto",
          lastMessage: "Ya subieron las calis",
          email: "vcoeto@hotmail.com",
          profilePicture: "https://avatars.githubusercontent.com/u/60903421?v=4",
          isRead: true,
      },
      {
          commonClass: "Computer Intelligence",
          fullName: "Juan Carlos",
          lastMessage: "Ya subiste la tarea?",
          email: "vcoeto@hotmail.com",
          profilePicture: "https://avatars.githubusercontent.com/u/49993080?v=4",
          isRead: false,
      }
    ];

    const getChat = async (id) => {
      const chatsRef = firebase.firestore().collection('chat-conversation');
      const chatData = await chatsRef.where('id','==',id).get();
      chatData.docs.forEach(chat => {
        console.log(chat.data());
        getUser(chat.data().buddie, chat.data());
      })
    }

    const getUser = async(userID, chatInfo) => {
      console.log(userID);
      const response = firebase.firestore().collection('users').doc(userID);
      console.log(response);
      const userData = await response.get();
      const user = userData.data();
      console.log(user);
      let temp = {
        commonClass: "Bases de datos avanzadas",
        fullName: user?.fullName,
        lastMessage: chatInfo.lastMessage,
        email: user?.email,
        profilePicture: user?.profilePic,
        isRead: chatInfo.isRead,
        chat: chatInfo
      }
      chat = temp;
      chatRooms.push(chat);
      console.log(chatRooms);
      ready =  true;
    }

    function openChat(index){
        console.log("Attempting to open chat number",index,"corresponding to", chatRooms[index]);
        navigation.navigate('ChatRoom', { profilePicture:  chatRooms[index].profilePicture, name: chatRooms[index].fullName, })
    }

    function chats(){
      return chatRooms.map( (chatRoom, index) => {
        let imageURL = chatRoom.profilePicture
        return(
          <View style={styles.header} key={index}>
              <TouchableWithoutFeedback onPress={() => openChat(index)}>
                <View style={[styles.headerContent, {flexDirection: "row"}]}>
                    <View style={{ flex: 2}}>
                    <Image style={styles.avatar} source={{uri:imageURL}}/>
                    </View>
                    <View style={{ flex: 4, flexDirection: "column"}}>
                    <View style={{ flex: 1}}>
                    <Text style={styles.name}> {chatRoom?.fullName} </Text>
                    </View>
                    <View style={{ flex: 2}}>
                    <Text style={styles.topic}>{chatRoom.commonClass} </Text>
                    <View style={{flexDirection: "row"}}>
                    <Text style={styles.lastMessage}>{chatRoom.lastMessage}</Text>{chatRoom.isRead ? <Ionicons name="checkmark-done-outline" size={18} color="blue" />: <Ionicons name="checkmark-done-outline" size={18} color="grey"/>}
                    </View>
                    </View>
                    </View>
                </View>
              </TouchableWithoutFeedback>
          </View>
        )
      })
    }

    useEffect( () => {
      user.chats.forEach(chatID => {
        getChat(chatID);
      })
    }, []);

    return(
      <View style={styles.container}>
        <Text style={styles.title}>Chat Rooms</Text>
        {chats()}
      </View>
    )
};

export default ChatRooms;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      height: '100%'
    },
    title: {
      backgroundColor: '#3CACAE',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 35,
      marginBottom: 25,
      paddingTop: 40,
      fontWeight: 'bold',
      height: 100,
      color: 'white',
    },
    header:{
        backgroundColor: "#ffffff",
        borderRadius: 40,
        borderColor: '#778899',
        borderWidth: 0.5,
        width: 340,
        marginTop: 10,
        marginRight: 'auto',
        marginBottom: 10,
        marginLeft: 'auto',
      },
      headerContent:{
        padding:10,
        alignItems: 'center',
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "#C26DBC",
        marginBottom:10,
      },
      name:{
        fontSize:22,
        color:"#000000",
        fontWeight:'600',
      },
      topic:{
        fontSize:16,
        color:"#778899",
        fontWeight:'600',
      },
      lastMessage:{
        fontSize: 12,
        color:"#778899",
      },
      body:{
        backgroundColor: "#C8F4F9",
        height: 500,
        alignItems:'center',
        borderRadius: 30,
        height: 450,
        width: 340,
        marginTop: 0,
        marginRight: 'auto',
        marginBottom: 0,
        marginLeft: 'auto',
      },

});