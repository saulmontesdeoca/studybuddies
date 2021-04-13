import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let currentUser = this.props.user;
    console.log(currentUser);
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: 'https://avatars.githubusercontent.com/u/31284834?s=400&u=63898bb74fbe573a34c33b288a089443cbbe3c28&v=4'}}/>

                <Text style={styles.name}> {currentUser.fullName} </Text>
                <Text style={styles.userInfo}>{currentUser.email} </Text>
                <Text style={styles.userInfo}>{currentUser?.campus} </Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Entypo name="home" size={30} color="black" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Home</Text>
              </View>
            </View>

            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Ionicons name="settings-outline" size={30} color="black" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Settings</Text>
              </View>
            </View>

            <View style={styles.item}>
              <View style={styles.iconContent}>
              <FontAwesome5 name="book-reader" size={30} color="black" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Subjects</Text>
              </View>
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  header:{
    backgroundColor: "#ffffff",
    borderRadius: 40,
    borderColor: '#000000',
    width: 340,
    marginTop: 10,
    marginRight: 'auto',
    marginBottom: 10,
    marginLeft: 'auto',
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
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
  userInfo:{
    fontSize:16,
    color:"#778899",
    fontWeight:'600',
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
  item:{
    flexDirection : 'row',
    height: 50,
    alignItems: 'center',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-start',
  },
  icon:{
    width:30,
    height:30,
  },
  info:{
    fontSize:18,
    color: "#000000",
  }
});
