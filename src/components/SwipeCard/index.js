import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import { Dimensions } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import { LinearGradient } from 'expo-linear-gradient';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


// const Card = (props) => {
//   return (
//     <View style={styles.card}>
//       <Image
//           style={styles.buddyImg}
//           source={{
//               uri: props.imgUrl
//           }}
//       />
//       <View style={styles.cardFooter}>
//           <Text style={styles.cardTitle}>
//             {props.name}
//           </Text>
//           <Text style={styles.cardText}>{props.description}</Text>
//       </View>
//     </View>
//   )
// }
const Card = (props) => {
  return (
    <View style={styles.card}>
        <ImageBackground
            style={styles.fadingImage}
            source={{uri: props.imgUrl}}
        >
            <LinearGradient 
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)','rgba(0,0,0,0.5)','rgba(0,0,0,0.85)']}
                style={styles.gradient}
                start={{ x: 0.5, y: 0.5 }}
                end={{ x: 0.5, y: 1 }}
            />
            <View style={styles.cardInfo}> 
              <View style={styles.cardTitleSection}>
                <Text style={styles.cardTitle}><Text style={{fontWeight: "bold"}}>{props.name}, </Text>{props.carrera}</Text>
              </View>
              <View style={styles.cardDescriptionSection}>
                  <Text style={styles.cardDescription}>{props.description}</Text>
              </View>
            </View>
        </ImageBackground>
    </View>
  )
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.user;
  }

  handleYup (card) {
    // this.setState({
    //   ...,
    //   yup: yup.push(card.name);
    // })
    console.log(`Yup for ${card.name}`)
    console.log(this.state)

  }
  handleNope (card) {
    console.log(`Nope for ${card.name}`)
  }
  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <SwipeCards
        cards={this.props.buddies}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
      />
    )
  }
}
const styles = StyleSheet.create({
  card: {
    width: windowWidth/1.05,
    height:  windowHeight/1.4,
    borderColor: 'grey',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    justifyContent: 'flex-end',

    elevation: 13,
},
 cardText: {
    fontSize: 16
 },
 noMoreCardsText: {
    fontSize: 22,
  },
  cardInfo:{
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20
  },
  cardTitleSection: {
    // flex:1
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: 'white'
  },
  cardDescriptionSection: {
    // flex: 2,
  },
  cardTitle: {
    fontSize: 28,
    paddingBottom: 12,
    fontWeight: "bold",
    color: 'white'
  },
  cardFooter: {
      paddingLeft: 20,
      paddingTop: 30,
      paddingRight:20,
      backgroundColor: '#fff'
  },
  shadow: {
    backgroundColor: '#000',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    
    elevation: 13,
  },
  containerTitle: {
    margin: 20,
    marginBottom: 15,
    marginTop: windowHeight/10
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
  title: {
    fontWeight: "bold",
    fontSize: 42,
    color: '#4E4E4E',
  },
  fadingImage: {
    flex: 1,
    width: '100%',
    maxHeight: '100%',
    resizeMode: 'contain',
  },
  button: {
    width: 120,
    marginTop: 15,
    marginRight: 30,
  },
  buttonContainer: {
      flexDirection: 'row-reverse',
  }
})