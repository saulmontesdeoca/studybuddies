import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { Dimensions } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


class Card extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <View style={styles.card}>
        <Image
            style={styles.buddyImg}
            source={{
                uri: this.props.imgUrl
            }}
        />
        <View style={styles.cardFooter}>
            <Text style={styles.cardTitle}>
              {this.props.name}
            </Text>
            <Text style={styles.cardText}>{this.props.description}</Text>

        </View>
      </View>
    )
  }
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
    width: windowWidth/1.1,
    height:  windowHeight/1.4,
    borderColor: 'grey',
    borderRadius: 20,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    overflow: 'hidden',
    shadowOffset: {  width: 10,  height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
},
 cardText: {
    fontSize: 16
 },
 noMoreCardsText: {
    fontSize: 22,
  },
  buddyImg: {
    height: 400
  },
  cardTitle: {
    fontSize: 28,
    paddingBottom: 12
  },
  cardFooter: {
      paddingLeft: 20,
      paddingTop: 30,
      paddingRight:20,
      backgroundColor: '#fff'
  }
})